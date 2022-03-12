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
          data={getCostByDay(valleConsumptions)}
          labels={getDates(consumptions)}
          title={t('sparkline_valle_title', {
            val: getTotalCost(valleConsumptions),
          })}
          subtitle={t('sparkline_valle_subtitle', {
            val: getTotalConsumption(valleConsumptions),
          })}
        />
      </div>
    </Col>
  );
};

export default ValleSummary;
