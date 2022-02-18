import Papa from 'papaparse';

export type Data = {
  CUPS: string;
  Fecha: string;
  Hora: string;
  Consumo: string;
  Metodo_obtencion: string;
};

export type Consumption = {
  [date: string]: {
    [k: number]: {
      consumption: number;
      cost: number | undefined;
    };
  };
};

export type Prices = {
  [key: string]: number;
};

//calculations ----
export const parseCSV = (file: File) => () => {
  return new Promise<Data[]>((resolve, reject) => {
    Papa.parse<Data, File>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
      error: reject,
    });
  });
};

export const toConsumptions = (data: Data[]): Consumption => {
  return data.reduce(
    (acc: Consumption, row) => ({
      ...acc,
      [row.Fecha]: {
        ...(acc[row.Fecha] || {}),
        [row.Hora]: { consumption: parseFloat(row.Consumo.replace(',', '.')) },
      },
    }),
    {},
  );
};

const formatDate = (date: string): string => {
  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}`;
};

const toISOString = (date: string, hour: number): string => {
  const [day, month, year] = date.split('/');

  const dateObj = new Date(`${year}/${month}/${day}`);
  dateObj.setHours(hour);

  return dateObj.toISOString().replace('.000Z', '+00:00');
};

const adjustCNMCHour = (hour: string) => parseInt(hour) - 1;

const pricesSearcher = (prices: Prices[]) => {
  const pricesFlattened = prices.reduce((acc, price) => ({ ...acc, ...price }), {} as Prices);
  return (date: string, hour: string): number => pricesFlattened[toISOString(date, adjustCNMCHour(hour))];
};

const consumptionSearcher =
  (consumptions: Consumption) =>
  (date: string, hour: string): number =>
    consumptions[date][parseInt(hour)].consumption;

export const groupConsumptionByDate = (consumptions: Consumption): { name: string; data: number[] }[] =>
  Object.keys(consumptions).map((date) => {
    const endHour = Math.max(...Object.keys(consumptions[date]).map((h) => parseInt(h)));
    return {
      name: date,
      data: new Array(endHour).fill(0).map((_, index) => consumptions[date][index + 1]?.consumption),
    };
  });

export const getTotal = (consumptions: Consumption): number =>
  Object.keys(consumptions).reduce(
    (acc, date) =>
      acc +
      Object.keys(consumptions[date]).reduce((acc, hour) => {
        const cost = consumptions[date][parseInt(hour)].cost;
        if (cost === undefined) throw new Error(`Missing cost for ${date}:${hour}`);

        return acc + cost;
      }, 0),
    0,
  );

export const getCostByDay = (consumptions: Consumption): number[] => {
  return Object.keys(consumptions).map((date) =>
    parseFloat(
      Object.keys(consumptions[date])
        .reduce((acc, hour) => acc + (consumptions[date][parseInt(hour)]?.cost || 0), 0)
        .toFixed(2),
    ),
  );
};

export const getDates = (consumptions: Consumption): string[] => Object.keys(consumptions).map(formatDate);

//actions ----
const fetchPrices = async (date: string): Promise<Prices> => {
  const response = await fetch(`prices/2.0TD/${formatDate(date)}.json`);
  try {
    return await response.json();
  } catch {
    console.log(`Prices for ${date} couldn't be found`);
    return {};
  }
};

export const getConsumptionsWithPrice = (consumptions: Consumption) => async (): Promise<Consumption> => {
  return Promise.all(Object.keys(consumptions).map(fetchPrices)).then((prices) => {
    const lookupPrices = pricesSearcher(prices);
    const lookupConsumptions = consumptionSearcher(consumptions);

    return Object.keys(consumptions).reduce((consumptionsWithPrices, date) => {
      return {
        ...consumptionsWithPrices,
        [date]: Object.keys(consumptions[date]).reduce(
          (consumptionsByDayWithPrices, hour) => ({
            ...consumptionsByDayWithPrices,
            [parseInt(hour)]: {
              consumption: lookupConsumptions(date, hour),
              cost: lookupPrices(date, hour) && lookupPrices(date, hour) * lookupConsumptions(date, hour),
            },
          }),
          {},
        ),
      };
    }, {});
  });
};
