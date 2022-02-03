import 'regenerator-runtime/runtime';
import { task } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { parseCSV, getConsumptionsWithPrice, toConsumptions } from '../actions';
import { getNextState, Store } from '../documents';

export const updateConsumptions = async (store: Store, file: File): Promise<Store> => {
    return pipe(
        task.of(file),
        task.chain(parseCSV),
        task.map(toConsumptions),
        task.chain(getConsumptionsWithPrice),
        task.map((x) => getNextState(store, x)),
    )();
};

export default { updateConsumptions };
