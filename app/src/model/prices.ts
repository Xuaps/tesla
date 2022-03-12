import { adjustCNMCHour, formatDate, toISOString } from './date';

export type Prices = {
  [key: string]: number;
};

export const pricesSearcher = (
  prices: Prices[],
): ((date: string, hour: string) => number) => {
  const pricesFlattened = prices.reduce(
    (acc, price) => ({ ...acc, ...price }),
    {} as Prices,
  );

  return (date: string, hour: string): number =>
    pricesFlattened[toISOString(date, adjustCNMCHour(hour))] || 0;
};

export const fetchPrices = async (date: string): Promise<Prices> => {
  const response = await fetch(`prices/2.0TD/${formatDate(date)}.json`);
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const FIXED_POWER_PRICES: { [key: string]: { punta: number; valle: number } } =
  {
    '2022': {
      punta: 27.958789,
      valle: 1.258556,
    },
    '2021': {
      punta: 23.751377,
      valle: 0.979237,
    },
  };

export const getPuntaPrice = (
  power: number,
  days: { year: string; num: number }[],
) => {
  const total = days.reduce(
    (acc, days) =>
      acc + (power * FIXED_POWER_PRICES[days.year].punta * days.num) / 365,
    0,
  );
  return parseFloat(total.toFixed(2));
};

export const getVallePrice = (
  power: number,
  days: { year: string; num: number }[],
) => {
  const total = days.reduce(
    (acc, days) =>
      acc + (power * FIXED_POWER_PRICES[days.year].valle * days.num) / 365,
    0,
  );
  return parseFloat(total.toFixed(2));
};

export const getComisionPrice = (power: number, days: number) => {
  const total = (power * 3.113 * days) / 365;
  return parseFloat(total.toFixed(2));
};

export const getAveragePrice = (prices: Prices[], date: string): number => {
  const lookupPrices = pricesSearcher(prices);
  const datePrices = Array(25)
    .fill(0)
    .map((_, index) => lookupPrices(date, index.toString()));

  const total = datePrices.reduce((acc, price) => acc + price, 0);

  return parseFloat(
    (total / datePrices.filter((price) => price > 0).length).toFixed(2),
  );
};
