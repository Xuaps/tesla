import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Col, Row } from 'react-bootstrap';
import { Store } from '../store';
import { groupConsumptionByDate } from '../model';
import { TFunction, useTranslation } from 'react-i18next';

const options = (t: TFunction<'ns1', undefined>): ApexOptions => ({
  chart: {
    type: 'heatmap',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#1c3397'],
  title: {
    text: t('heatmap_title'),
  },
});

const Heatmap = ({
  consumptions,
}: {
  consumptions: Store['consumptions'];
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col>
        <div className="box" data-cy="heatmap">
          <ReactApexChart
            options={options(t)}
            series={groupConsumptionByDate(consumptions)}
            type="heatmap"
          />
        </div>
      </Col>
    </Row>
  );
};

export default Heatmap;
