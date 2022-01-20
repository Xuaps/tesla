import { Consumption } from './actions';

export type Store = {
    consumptions: {
        name: string;
        data: number[];
    }[];
};

export const getNextState = (store: Store, consumptions: Consumption[]): Store => {
    const dates = consumptions.reduce((acc: string[], c) => {
        if (acc.indexOf(c.date) > -1) return acc;
        return [...acc, c.date];
    }, []);

    return {
        ...store,
        consumptions: dates.map((date) => ({
            name: date,
            data: consumptions.filter((c) => c.date === date).map((c) => c.consumption),
        })),
    };
};
