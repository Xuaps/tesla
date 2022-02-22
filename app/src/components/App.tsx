import React, { ChangeEvent, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import us from '../user-stories';
import { EMPTY_STORE, Store } from '../store';
import Consumptions from './Consumptions';
import { useTranslation } from 'react-i18next';
import './App.css';
import TotalConsumption from './TotalConsumption';
import TotalCost from './TotalCost';
import PowerCost from './PowerCost';

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
        <Col>
          <h1>{t('welcome')} </h1>
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
      <Row className="sparkboxes mt-4 mb-4">
        <TotalCost consumptions={store.consumptions} />
        <TotalConsumption consumptions={store.consumptions} />
        <PowerCost />
      </Row>
      <Consumptions consumptions={store.consumptions} />
    </Container>
  );
};

export default App;
