import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { groupConsumptionByDate } from '../actions';
import { Store } from '../documents';
import Heatmap from './Heatmap';

const Consumptions = ({ consumptions }: { consumptions: Store['consumptions'] }) => (
  <>
    <Row>
      <Col>
        <Heatmap consumptions={groupConsumptionByDate(consumptions)} />
      </Col>
    </Row>
  </>
);

export default Consumptions;
