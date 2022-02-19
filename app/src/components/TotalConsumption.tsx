import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Consumption, getConsumptionByDay, getDates, getTotalConsumption } from '../model';
import SparkLine from './SparkLine';

const TotalConsumption = ({ consumptions }: { consumptions: Consumption }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Col className="md-4">
      <div className="box" data-cy="total-consumption">
        <SparkLine
          data={getConsumptionByDay(consumptions)}
          labels={getDates(consumptions)}
          title={t('sparkline_consumption_title', { val: getTotalConsumption(consumptions) })}
          subtitle={t('sparkline_consumption')}
        />
      </div>
    </Col>
  );
};

export default TotalConsumption;
