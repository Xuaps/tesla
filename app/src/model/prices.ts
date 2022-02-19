import { adjustCNMCHour, formatDate, toISOString } from './date';

export type Prices = {
  [key: string]: number;
};

export const pricesSearcher = (prices: Prices[]): ((date: string, hour: string) => number) => {
  const pricesFlattened = prices.reduce((acc, price) => ({ ...acc, ...price }), {} as Prices);
  return (date: string, hour: string): number => pricesFlattened[toISOString(date, adjustCNMCHour(hour))];
};

export const fetchPrices = async (date: string): Promise<Prices> => {
  const response = await fetch(`prices/2.0TD/${formatDate(date)}.json`);
  try {
    return await response.json();
  } catch {
    console.log(`Prices for ${date} couldn't be found`);
    return {};
  }
};
