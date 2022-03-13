import React, { ChangeEvent, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import us from '../user-stories';
import { EMPTY_STORE, Store } from '../store';
import TotalConsumption from './TotalConsumption';
import TotalCost from './TotalCost';
import PowerCost from './PowerCost';
import Heatmap from './Heatmap';
import Segments from './Segments';
import PuntaSummary from './PuntaSummary';
import LlanoSummary from './LlanoSummary';
import ValleSummary from './ValleSummary';
import Header from './Header';
import Configuration from './Configuration';
import './App.css';

const App = (): JSX.Element => {
  const [store, setStore] = useState<Store>(EMPTY_STORE);

  const fileLoaded = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target || !e.target.files) return;

    const newStore = await us.updateConsumptions(store, e.target.files[0]);
    setStore(newStore);
  };

  const updatePunta = (e: ChangeEvent<HTMLInputElement>) => {
    setStore({
      ...store,
      config: { ...store.config, punta: Number(e.target.value) },
    });
  };

  const updateValle = (e: ChangeEvent<HTMLInputElement>) => {
    setStore({
      ...store,
      config: { ...store.config, valle: Number(e.target.value) },
    });
  };

  return (
    <Container className="App">
      <Header />
      <Configuration
        fileLoaded={fileLoaded}
        updateValle={updateValle}
        updatePunta={updatePunta}
        config={store.config}
      />
      {store !== EMPTY_STORE && (
        <>
          <Row className="sparkboxes mt-4 mb-4">
            <TotalConsumption consumptions={store.consumptions} />
            <TotalCost consumptions={store.consumptions} />
            <PowerCost
              punta={store.config.punta}
              valle={store.config.valle}
              consumptions={store.consumptions}
            />
          </Row>
          <Row className="sparkboxes mt-4 mb-4">
            <PuntaSummary consumptions={store.consumptions} />
            <LlanoSummary consumptions={store.consumptions} />
            <ValleSummary consumptions={store.consumptions} />
          </Row>
          <Heatmap consumptions={store.consumptions} />
          <Segments consumptions={store.consumptions} />
        </>
      )}
    </Container>
  );
};

export default App;
