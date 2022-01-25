/* eslint-disable */
// @ts-nocheck
import 'regenerator-runtime/runtime';
import {parseCSV, toConsumptions} from './actions';
import {getNextState, Store} from './documents';



export const updateConsumptions = async (store: Store, file: File): Promise<Store> => {
  return file 
    |> parseCSV(%)
    |> await %
    |> toConsumptions(%) 
    |> getNextState(store, %)
};

export default { updateConsumptions };
