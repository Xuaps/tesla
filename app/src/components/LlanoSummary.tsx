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

const LlanoSummary = ({
  consumptions,
}: {
  consumptions: Consumption;
}): JSX.Element => {
  const { t } = useTranslation();
  const llanoConsumptions: Consumption = filterByPeriod(consumptions, 'llano');

  return (
    <Col className="md-4">
      <div className="box" data-cy="llano-summary">
        <SparkLine
          data={getCostByDay(llanoConsumptions)}
          labels={getDates(consumptions)}
          title={t('sparkline_llano_title', {
            val: getTotalCost(llanoConsumptions),
          })}
          subtitle={t('sparkline_llano_subtitle', {
            val: getTotalConsumption(llanoConsumptions),
          })}
        />
      </div>
    </Col>
  );
};

export default LlanoSummary;
