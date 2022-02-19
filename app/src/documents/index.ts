import { Consumption } from '../actions';

export type Store = {
  consumptions: Consumption;
};

export const EMPTY_STORE = {
  consumptions: {},
};

export const updateConsumptionsData = (store: Store, consumptions: Consumption): Store => ({
  ...store,
  consumptions: consumptions,
});
