import React, { ChangeEvent, useState } from 'react';
import us from './user-stories';
import HeatMap from 'react-heatmap-grid';
import './App.css';
import { Store } from './documents';

const App = () => {
    const [store, setStore] = useState<Store>({ heatmap: { xLabels: [], yLabels: [], data: [] } });

    const fileLoaded = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target || !e.target.files) return;

        const newStore = await us.updateConsumptions(store, e.target.files[0]);
        setStore(newStore);
    };

    return (
        <div className="App">
            <h1> Visualiza tu consumo </h1>
            <label htmlFor="consumptionsFile">Cargar consumo</label>
            <input type="file" id="consumptionsFile" name="consumptionsFile" onChange={fileLoaded}></input>
            <HeatMap xLabels={store.heatmap.xLabels} yLabels={store.heatmap.yLabels} data={store.heatmap.data} />
        </div>
    );
};

export default App;
