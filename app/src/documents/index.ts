import { Consumption } from '../actions';

export type Store = {
    consumptions: {
        name: string;
        data: number[];
        prices: (number | null)[];
    }[];
};

export const getNextState = (store: Store, consumptions: Consumption[]): Store => {
    const dates = consumptions.reduce((acc: string[], c) => {
        if (acc.indexOf(c.date) > -1) return acc;
        return [...acc, c.date];
    }, []);

    return {
        ...store,
        consumptions: dates.map((date) => {
            const consumptionByDate = consumptions.filter((c) => c.date === date);
            return {
                name: date,
                data: consumptionByDate.map((c) => c.consumption),
                prices: consumptionByDate.map((c) => c.price && c.consumption * c.price),
            };
        }),
    };
};
