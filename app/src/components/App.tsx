import React, { ChangeEvent, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import us from '../user-stories';
import { EMPTY_STORE, Store } from '../store';
import { useTranslation } from 'react-i18next';
import TotalConsumption from './TotalConsumption';
import TotalCost from './TotalCost';
import PowerCost from './PowerCost';
import Heatmap from './Heatmap';
import Segments from './Segments';
import PuntaSummary from './PuntaSummary';
import './App.css';
import LlanoSummary from './LlanoSummary';
import ValleSummary from './ValleSummary';

const App = (): JSX.Element => {
  const [store, setStore] = useState<Store>(EMPTY_STORE);
  const { t } = useTranslation();

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
      <Row>
        <Col md={{ span: 4 }}>
          <h1>{t('welcome')} </h1>
        </Col>
        <Col md={{ span: 8 }}>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a
                target="_blank"
                className="nav-link active"
                href="https://sede.cnmc.gob.es/listado/censo/1"
              >
                {t('nav_download')}
              </a>
            </li>
            <li className="nav-item">
              <a
                target="_blank"
                className="nav-link"
                href="https://www.youtube.com/watch?v=IbA7QL4MuJY"
              >
                {t('nav_bill')}
              </a>
            </li>
            <li className="nav-item">
              <a
                target="_blank"
                className="nav-link"
                href="https://www.youtube.com/watch?v=rRWWirKLHAU"
              >
                {t('nav_market')}
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8 }}>
          <Form.Label>{t('uploader_welcome')}</Form.Label>
          <Form.Control type="file" onChange={fileLoaded} />
        </Col>
        <Col md={{ span: 2 }}>
          <Form.Label>
            {t('range_punta', { val: store.config.punta })}
          </Form.Label>
          <Form.Range
            min={1.15}
            max={14.49}
            defaultValue={store.config.punta}
            onChange={updatePunta}
            step={0.01}
          />
        </Col>
        <Col md={{ span: 2 }}>
          <Form.Label>
            {t('range_valle', { val: store.config.valle })}
          </Form.Label>
          <Form.Range
            min={1.15}
            max={14.49}
            defaultValue={store.config.valle}
            onChange={updateValle}
            step={0.01}
          />
        </Col>
      </Row>
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
          {process.env.FEATURE_PERIODS && (
            <Row className="sparkboxes mt-4 mb-4">
              <PuntaSummary consumptions={store.consumptions} />
              <LlanoSummary consumptions={store.consumptions} />
              <ValleSummary consumptions={store.consumptions} />
            </Row>
          )}
          <Heatmap consumptions={store.consumptions} />
          <Segments consumptions={store.consumptions} />
        </>
      )}
    </Container>
  );
};

export default App;
