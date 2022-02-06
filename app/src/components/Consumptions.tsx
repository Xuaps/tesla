import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Store } from '../documents';
import Heatmap from './Heatmap';

const prepareHeatmapData = (consumptions: Store['consumptions']) =>
    Object.keys(consumptions).map((date) => {
        const hours = Object.keys(consumptions[date])
            .sort()
            .map((h) => parseInt(h));
        return {
            name: date,
            data: hours.map((h) => consumptions[date][h].consumption),
            prices: hours.map((h) => consumptions[date][h].cost),
        };
    });

const Consumptions = ({ consumptions }: { consumptions: Store['consumptions'] }) => (
    <>
        <Row>
            <Col>
                <Heatmap consumptions={prepareHeatmapData(consumptions)} />
            </Col>
        </Row>
    </>
);

export default Consumptions;
