import React, { ChangeEvent, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import us from '../user-stories';
import { EMPTY_STORE, Store } from '../documents';
import Consumptions from './Consumptions';
import { useTranslation } from 'react-i18next';
import './App.css';
import SparkLine from './SparkLine';
import Summary from './Summary';

const App = () => {
  const [store, setStore] = useState<Store>(EMPTY_STORE);
  const { t } = useTranslation();

  const fileLoaded = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target || !e.target.files) return;

    const newStore = await us.updateConsumptions(store, e.target.files[0]);
    setStore(newStore);
  };

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>{t('welcome')} </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group as={Row} controlId="formFile" className="mb-3">
            <Form.Label column sm="4">
              {t('uploader_welcome')}
            </Form.Label>
            <Col sm="8">
              <Form.Control type="file" onChange={fileLoaded} />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row className="sparkboxes mt-4 mb-4">
        <Col className="md-4">
          <div className="box">
            <SparkLine data={[]} labels={[]} title={t('sparkline_cost')} />
          </div>
        </Col>
        <Col className="md-4"></Col>
        <Col className="md-4"></Col>
      </Row>
      <Consumptions consumptions={store.consumptions} />
      <Summary consumptions={store.consumptions} />
    </Container>
  );
};

export default App;
