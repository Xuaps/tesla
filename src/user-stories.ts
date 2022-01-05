export type Store = {
    heatmap: {
        xLabels: string[];
        yLabels: string[];
        data: number[][];
    };
};

const loadConsumptions = (store: Store, file: File): Store => {
    return {
        ...store,
        heatmap: {
            xLabels: ['1', '2'],
            yLabels: ['02/12/2021'],
            data: [[8.9, 10]],
        },
    };
};

export default { loadConsumptions };
