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

const ValleSummary = ({
  consumptions,
}: {
  consumptions: Consumption;
}): JSX.Element => {
  const { t } = useTranslation();
  const valleConsumptions: Consumption = filterByPeriod(consumptions, 'valle');
  return (
    <Col className="md-4">
      <div className="box" data-cy="valle-summary">
        <SparkLine
          formatter={(val: number) => t('consumption', { val })}
          data={getConsumptionByDay(valleConsumptions)}
          labels={getDates(consumptions)}
          subtitle={t('sparkline_consumption_value', {
            val: getTotalConsumption(valleConsumptions),
          })}
          title={t('sparkline_valle_consumption')}
        />
      </div>
    </Col>
  );
};

export default ValleSummary;
