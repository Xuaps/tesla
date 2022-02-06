import React, { ChangeEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Store } from '../documents';
import Heatmap from './Heatmap';

const Consumptions = ({ consumptions }: { consumptions: Store['consumptions'] }) => (
    <>
        <Row>
            <Col>
                <Heatmap consumptions={consumptions} />
            </Col>
        </Row>
    </>
);

export default Consumptions;
