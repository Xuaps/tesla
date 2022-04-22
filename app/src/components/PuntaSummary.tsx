import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Consumption,
  filterByPeriod,
  getConsumptionByDay,
  getDates,
  getTotalConsumption,
} from '../model';
import SparkLine from './SparkLine';

const PuntaSummary = ({
  consumptions,
}: {
  consumptions: Consumption;
}): JSX.Element => {
  const { t } = useTranslation();
  const puntaConsumptions: Consumption = filterByPeriod(consumptions, 'punta');

  return (
    <Col className="md-4">
      <div className="box" data-cy="punta-summary">
        <SparkLine
          formatter={(val: number) => t('consumption', { val })}
          data={getConsumptionByDay(puntaConsumptions)}
          labels={getDates(consumptions)}
          subtitle={t('sparkline_consumption_value', {
            val: getTotalConsumption(puntaConsumptions),
          })}
          title={t('sparkline_punta_consumption')}
        />
      </div>
    </Col>
  );
};

export default PuntaSummary;
