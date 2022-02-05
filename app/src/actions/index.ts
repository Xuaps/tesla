import Papa from 'papaparse';

export type Data = {
    CUPS: string;
    Fecha: string;
    Hora: string;
    Consumo: string;
    Metodo_obtencion: string;
};

export type Consumption = {
    cups: string;
    date: string;
    hour: string;
    consumption: number;
    price: number | null;
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

export const toConsumptions = (data: Data[]): Consumption[] => {
    return data.map((row) => {
        return {
            cups: row.CUPS,
            date: row.Fecha,
            hour: row.Hora,
            consumption: parseFloat(row.Consumo.replace(',', '.')),
            price: null,
        };
    });
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

export const getConsumptionsWithPrice = (consumptions: Consumption[]) => async () => {
    const dates = consumptions.reduce((acc: string[], c) => {
        if (acc.indexOf(c.date) > -1) return acc;
        return [...acc, c.date];
    }, []);

    const prices = (await Promise.all(dates.map((date) => fetchPrices(date)))).reduce(
        (acc, price) => ({ ...acc, ...price }),
        {},
    );

    return consumptions.map((consumption) => ({
        ...consumption,
        price: prices[toISOString(consumption.date, adjustCNMCHour(consumption.hour))],
    }));
};
