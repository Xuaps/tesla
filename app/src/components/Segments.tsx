import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import { TFunction, useTranslation } from 'react-i18next';
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
});

const Segments = ({
  consumptions,
}: {
  consumptions: Store['consumptions'];
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col>
        <div className="box" data-cy="consumption-segments">
          <ReactApexChart
            type="scatter"
            options={options(t)}
            series={[
              {
                name: 'precio <precio medio - 25%',
                data: [
                  [1, 36.4],
                  [2, 1.7],
                  [2, 3.7],
                ],
              },
              {
                name: 'precio medio -25 % > precio < precio medio + 25%',
                data: [
                  [3, 36.4],
                  [4, 1.7],
                  [5, 3.7],
                ],
              },
              {
                name: 'precio > precio medio + 25%',
                data: [
                  [6, 36.4],
                  [7, 1.7],
                  [7, 3.7],
                ],
              },
            ]}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Segments;
