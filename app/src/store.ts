import { Consumption } from './model';

export type Store = {
  consumptions: Consumption;
  config: {
    punta: number;
    valle: number;
  };
};

export const EMPTY_STORE = {
  consumptions: {},
  config: {
    punta: 4.6,
    valle: 4.6,
  },
};

export const updateConsumptionsData = (
  store: Store,
  consumptions: Consumption,
): Store => ({
  ...store,
  consumptions: consumptions,
});
