import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Consumption,
  filterByPeriod,
  getCostByDay,
  getDates,
  getTotalConsumption,
  getTotalCost,
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
          data={getCostByDay(puntaConsumptions)}
          labels={getDates(consumptions)}
          title={t('sparkline_punta_title', {
            val: getTotalCost(puntaConsumptions),
          })}
          subtitle={t('sparkline_punta_subtitle', {
            val: getTotalConsumption(puntaConsumptions),
          })}
        />
      </div>
    </Col>
  );
};

export default PuntaSummary;
