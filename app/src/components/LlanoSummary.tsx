import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Consumption,
  getCostByDay,
  getDates,
  getTotalConsumption,
  getTotalCost,
} from '../model';
import SparkLine from './SparkLine';

const LlanoSummary = ({
  consumptions,
}: {
  consumptions: Consumption;
}): JSX.Element => {
  const { t } = useTranslation();
  const puntaConsumptions: Consumption = {
    '2022-01-01': {
      [0]: {
        consumption: 0.23,
        cost: 1.23,
        segment: 'average',
        period: 'punta',
      },
    },
  };

  return (
    <Col className="md-4">
      <div className="box" data-cy="llano-summary">
        <SparkLine
          data={getCostByDay(puntaConsumptions)}
          labels={getDates(consumptions)}
          title={t('sparkline_llano_title', {
            val: getTotalCost(puntaConsumptions),
          })}
          subtitle={t('sparkline_llano_subtitle', {
            val: getTotalConsumption(puntaConsumptions),
          })}
        />
      </div>
    </Col>
  );
};

export default LlanoSummary;
