import React, { ChangeEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Store } from '../documents';
import Heatmap from './Heatmap';

const Consumptions = ({
    consumptions,
    fileLoaded,
}: {
    consumptions: Store['consumptions'];
    fileLoaded: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
    <>
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
        <Row>
            <Col>
                <Heatmap consumptions={consumptions} />
            </Col>
        </Row>
    </>
);

export default Consumptions;
