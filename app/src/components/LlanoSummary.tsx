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
          formatter={(val: number) => t('consumption', { val })}
          data={getConsumptionByDay(llanoConsumptions)}
          labels={getDates(consumptions)}
          subtitle={t('sparkline_consumption_value', {
            val: getTotalConsumption(llanoConsumptions),
          })}
          title={t('sparkline_llano_consumption')}
        />
      </div>
    </Col>
  );
};

export default LlanoSummary;
