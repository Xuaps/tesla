import React, { ChangeEvent, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import us from '../user-stories';
import { EMPTY_STORE, Store } from '../documents';
import Consumptions from './Consumptions';
import './App.css';
import Summary from './Summary';

const App = () => {
    const [store, setStore] = useState<Store>(EMPTY_STORE);

    const fileLoaded = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target || !e.target.files) return;

        const newStore = await us.updateConsumptions(store, e.target.files[0]);
        setStore(newStore);
    };

    return (
        <Container className="App">
            <Row>
                <Col>
                    <h1> Visualiza tu consumo </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row} controlId="formFile" className="mb-3">
                        <Form.Label column sm="4">
                            Consumo en formato CNMC:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="file" onChange={fileLoaded} />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Consumptions consumptions={store.consumptions} />
            <Summary consumptions={store.consumptions} />
        </Container>
    );
};

export default App;
