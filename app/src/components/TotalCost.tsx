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
          formatter={(val: number) => t('price', { val })}
          data={getCostByDay(consumptions)}
          labels={getDates(consumptions)}
          subtitle={
            totalCost
              ? t('sparkline_cost_value', {
                  val: totalCost,
                })
              : t('not_available')
          }
          title={t('sparkline_cost')}
        />
      </div>
    </Col>
  );
};

export default TotalCost;
