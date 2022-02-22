import { formatDate } from './date';
import { Prices, pricesSearcher } from './prices';

export type Consumption = {
  [date: string]: {
    [k: number]: {
      consumption: number;
      cost: number | undefined;
    };
  };
};

export const consumptionSearcher =
  (consumptions: Consumption) =>
  (date: string, hour: string): number =>
    consumptions[date][parseInt(hour)].consumption;

export const groupConsumptionByDate = (
  consumptions: Consumption,
): { name: string; data: number[] }[] =>
  Object.keys(consumptions).map((date) => {
    const endHour = Math.max(
      ...Object.keys(consumptions[date]).map((h) => parseInt(h)),
    );
    return {
      name: date,
      data: new Array(endHour)
        .fill(0)
        .map((_, index) => consumptions[date][index + 1]?.consumption),
    };
  });

export const getTotalCost = (consumptions: Consumption): number =>
  parseFloat(
    Object.keys(consumptions)
      .reduce(
        (acc, date) =>
          acc +
          Object.keys(consumptions[date]).reduce((acc, hour) => {
            const cost = consumptions[date][parseInt(hour)].cost;
            if (cost === undefined)
              throw new Error(`Missing cost for ${date}:${hour}`);

            return acc + cost;
          }, 0),
        0,
      )
      .toFixed(2),
  );

export const getCostByDay = (consumptions: Consumption): number[] => {
  return Object.keys(consumptions).map((date) =>
    parseFloat(
      Object.keys(consumptions[date])
        .reduce(
          (acc, hour) => acc + (consumptions[date][parseInt(hour)]?.cost || 0),
          0,
        )
        .toFixed(2),
    ),
  );
};

export const getDates = (consumptions: Consumption): string[] =>
  Object.keys(consumptions).map(formatDate);

export const getDaysByYear = (consumptions: Consumption) =>
  getDates(consumptions)
    .map((date) => date.substring(0, 4))
    .reduce(
      (acc: { year: string; num: number }[], year: string) => [
        ...acc,
        {
          year,
          num: acc.find((days) => days.year === year)?.num ?? 1,
        },
      ],
      [],
    );

export const getConsumptionByDay = (consumptions: Consumption): number[] => {
  return Object.keys(consumptions).map((date) =>
    parseFloat(
      Object.keys(consumptions[date])
        .reduce(
          (acc, hour) => acc + consumptions[date][parseInt(hour)]?.consumption,
          0,
        )
        .toFixed(2),
    ),
  );
};

export const getTotalConsumption = (consumptions: Consumption): number => {
  return parseFloat(
    Object.keys(consumptions)
      .reduce(
        (acc, date) =>
          acc +
          Object.keys(consumptions[date]).reduce((acc, hour) => {
            const cost = consumptions[date][parseInt(hour)].consumption;
            return acc + cost;
          }, 0),
        0,
      )
      .toFixed(2),
  );
};

export const addPrices =
  (consumptions: Consumption) =>
  (prices: Prices[]) =>
  async (): Promise<Consumption> => {
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
              cost:
                lookupPrices(date, hour) &&
                lookupPrices(date, hour) * lookupConsumptions(date, hour),
            },
          }),
          {},
        ),
      };
    }, {});
  };
