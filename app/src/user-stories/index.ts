import 'regenerator-runtime/runtime';
import { task } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { updateConsumptionsData, Store } from '../store';
import { parseCSV, toConsumptions } from '../model';

export const updateConsumptions = (
  store: Store,
  file: File,
): Promise<Store> => {
  return pipe(
    task.of(file),
    task.chain(parseCSV),
    task.map(toConsumptions),
    task.map((x) => updateConsumptionsData(store, x)),
  )();
};

export default { updateConsumptions };
