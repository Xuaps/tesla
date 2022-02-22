import React from 'react';
import ReactApexChart, { Props as ReactChartProps } from 'react-apexcharts';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PowerCost = (): JSX.Element => {
  const { t } = useTranslation();
  const options: ReactChartProps = {
    dataLabels: {
      enabled: true,
      formatter: function (val: string) {
        return val + '';
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    labels: [t('donut_valle'), t('donut_punta')],
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      type: 'datetime',
    },
  };

  return (
    <Col className="md-4">
      <div className="box" data-cy="total-price">
        <Row>
          <ReactApexChart
            options={options}
            series={[15, 85]}
            type="donut"
            height="160"
          />
        </Row>
      </div>
    </Col>
  );
};

export default PowerCost;
