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
  const totalCost = getTotalCost(consumptions);
  return (
    <Col className="md-4">
      <div className="box" data-cy="total-price">
        <SparkLine
          data={getCostByDay(consumptions)}
          labels={getDates(consumptions)}
          title={
            totalCost
              ? t('sparkline_cost_title', {
                  val: totalCost,
                })
              : t('not_available')
          }
          subtitle={t('sparkline_cost')}
        />
      </div>
    </Col>
  );
};

export default TotalCost;
