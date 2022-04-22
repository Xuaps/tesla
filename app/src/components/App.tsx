import React, { ChangeEvent, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from '../AppInsights';
import us from '../user-stories';
import { EMPTY_CONSUMPTION, EMPTY_STORE, Store } from '../store';
import TotalConsumption from './TotalConsumption';
import Heatmap from './Heatmap';
import Segments from './Segments';
import PuntaSummary from './PuntaSummary';
import LlanoSummary from './LlanoSummary';
import ValleSummary from './ValleSummary';
import Header from './Header';
import Configuration from './Configuration';
import ErrorPage from './Error';
import StartPage from './Start';
import './App.css';

const App = (): JSX.Element => {
  const [store, setStore] = useState<Store>(EMPTY_STORE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const fileLoaded = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target || !e.target.files) return;

    setIsLoading(true);
    const file = e.target.files[0];
    setTimeout(async () => {
      const newStore = await us.updateConsumptions(store, file);
      setIsLoading(false);
      setStore(newStore);
    }, 500);
  };

  return (
    <Container className="App">
      <AppInsightsErrorBoundary
        onError={() => <ErrorPage />}
        appInsights={reactPlugin}
      >
        <Header />
        <Configuration fileLoaded={fileLoaded} />
        {isLoading && (
          <>
            <Spinner animation="border" variant="primary">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
            &nbsp;{t('loading')}
          </>
        )}
        {store.consumptions !== EMPTY_CONSUMPTION ? (
          <>
            <Row className="sparkboxes mt-4 mb-4">
              <TotalConsumption consumptions={store.consumptions} />
            </Row>
            <Row className="sparkboxes mt-4 mb-4">
              <PuntaSummary consumptions={store.consumptions} />
              <LlanoSummary consumptions={store.consumptions} />
              <ValleSummary consumptions={store.consumptions} />
            </Row>
            <Heatmap consumptions={store.consumptions} />
            <Segments consumptions={store.consumptions} />
          </>
        ) : (
          <StartPage />
        )}
      </AppInsightsErrorBoundary>
    </Container>
  );
};

export default App;
