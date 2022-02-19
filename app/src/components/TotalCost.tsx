import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Consumption, getCostByDay, getDates, getTotalCost } from '../model';
import SparkLine from './SparkLine';

const TotalCost = ({
  consumptions,
}: {
  consumptions: Consumption;
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Col className="md-4">
      <div className="box" data-cy="total-price">
        <SparkLine
          data={getCostByDay(consumptions)}
          labels={getDates(consumptions)}
          title={t('sparkline_cost_title', { val: getTotalCost(consumptions) })}
          subtitle={t('sparkline_cost')}
        />
      </div>
    </Col>
  );
};

export default TotalCost;
