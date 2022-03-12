import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import { TFunction, useTranslation } from 'react-i18next';
import { groupConsumptionBySegment } from '../model';
import { Store } from '../store';

const options = (t: TFunction<'ns1', undefined>): ApexOptions => ({
  chart: {
    height: 350,
    type: 'scatter',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
      type: 'xy',
    },
  },
  xaxis: {
    tickAmount: 10,
  },
  yaxis: {
    tickAmount: 7,
  },
  title: {
    text: t('segments_title'),
  },
  tooltip: {
    x: {
      formatter: (val: number) => t('segments_hour', { val }),
    },
    y: {
      formatter: (val: number) => t('consumption', { val }),
    },
  },
});

const Segments = ({
  consumptions,
}: {
  consumptions: Store['consumptions'];
}): JSX.Element => {
  const { t } = useTranslation();
  const segments = groupConsumptionBySegment(consumptions);
  return (
    <Row>
      <Col>
        <div className="box" data-cy="consumption-segments">
          <ReactApexChart
            type="scatter"
            options={options(t)}
            series={[
              {
                name: t('segments_below_average'),
                data: segments['belowAverage'],
              },
              {
                name: t('segments_average'),
                data: segments['average'],
              },
              {
                name: t('segments_above_average'),
                data: segments['aboveAverage'],
              },
            ]}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Segments;
