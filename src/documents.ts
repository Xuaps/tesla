import { Consumption } from './actions';

export type Store = {
    heatmap: {
        xLabels: string[];
        yLabels: string[];
        data: number[][];
    };
};

export const getNextState = (store: Store, consumptions: Consumption[]): Store => {
    const dates = consumptions.reduce((acc: string[], c) => {
        if (acc.indexOf(c.date) > -1) return acc;
        return [...acc, c.date];
    }, []);

    return {
        ...store,
        heatmap: {
            xLabels: Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => hour.toString()),
            yLabels: dates,
            data: dates.reduce(
                (acc: number[][], d) => [...acc, consumptions.filter((c) => c.date === d).map((c) => c.consumption)],
                [],
            ),
        },
    };
};
