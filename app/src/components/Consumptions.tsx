import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { groupConsumptionByDate } from '../actions';
import { Store } from '../documents';
import Heatmap from './Heatmap';

const Consumptions = ({ consumptions }: { consumptions: Store['consumptions'] }) => (
  <>
    <Row>
      <Col>
        <div data-cy="heatmap">
          <Heatmap consumptions={groupConsumptionByDate(consumptions)} />
        </div>
      </Col>
    </Row>
  </>
);

export default Consumptions;
