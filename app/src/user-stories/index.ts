import 'regenerator-runtime/runtime';
import { task } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { updateConsumptionsData, Store } from '../store';
import { fetchPrices, addPrices, parseCSV, toConsumptions } from '../model';

export const updateConsumptions = (
  store: Store,
  file: File,
): Promise<Store> => {
  return pipe(
    task.of(file),
    task.chain(parseCSV),
    task.map(toConsumptions),
    task.chain((consumption) =>
      pipe(
        () =>
          Promise.all(Object.keys(consumption).map(fetchPrices)).catch(
            () => [],
          ),
        task.chain((prices) => addPrices(consumption)(prices)),
      ),
    ),
    task.map((x) => updateConsumptionsData(store, x)),
  )();
};

export default { updateConsumptions };
