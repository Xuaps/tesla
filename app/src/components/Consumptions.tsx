import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { groupConsumptionByDate } from '../model';
import { Store } from '../store';
import Heatmap from './Heatmap';

const Consumptions = ({
  consumptions,
}: {
  consumptions: Store['consumptions'];
}): JSX.Element => (
  <>
    <Row>
      <Col>
        <div className="box" data-cy="heatmap">
          <Heatmap consumptions={groupConsumptionByDate(consumptions)} />
        </div>
      </Col>
    </Row>
  </>
);

export default Consumptions;
