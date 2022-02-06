import { Consumption } from '../actions';

export type Store = {
    raw: Consumption;
    consumptions: {
        name: string;
        data: number[];
        prices: (number | null)[];
    }[];
};

export const getNextState = (store: Store | {}, consumptions: Consumption): Store => {
    return {
        ...store,
        raw: consumptions,
        consumptions: Object.keys(consumptions).map((date) => {
            const hours = Object.keys(consumptions[date])
                .sort()
                .map((h) => parseInt(h));
            return {
                name: date,
                data: hours.map((h) => consumptions[date][h].consumption),
                prices: hours.map((h) => consumptions[date][h].cost),
            };
        }),
    };
};
