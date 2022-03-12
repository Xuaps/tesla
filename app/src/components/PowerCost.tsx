import React from 'react';
import ReactApexChart, { Props as ReactChartProps } from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Consumption,
  getComisionPrice,
  getDates,
  getPuntaPrice,
  getVallePrice,
  getDaysByYear,
} from '../model';

const PowerCost = ({
  punta,
  valle,
  consumptions,
}: {
  punta: number;
  valle: number;
  consumptions: Consumption;
}): JSX.Element => {
  const { t } = useTranslation();
  const options: ReactChartProps = {
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: t('power_cost_total_label'),
              formatter: function (w: { globals: { seriesTotals: number[] } }) {
                const {
                  globals: { seriesTotals },
                } = w;
                return t('price', {
                  val: seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0),
                });
              },
            },
          },
        },
      },
    },
    labels: [
      t('power_cost_valle'),
      t('power_cost_punta'),
      t('power_cost_comision'),
    ],
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return t('price', { val });
        },
      },
    },
  };
  const days = getDaysByYear(consumptions);

  return (
    <Col className="md-4">
      <div className="box" data-cy="fixed-price">
        <Row>
          <ReactApexChart
            options={options}
            series={[
              getVallePrice(valle, days),
              getPuntaPrice(punta, days),
              getComisionPrice(
                Math.max(valle, punta),
                getDates(consumptions).length,
              ),
            ]}
            type="donut"
            height="160"
          />
        </Row>
      </div>
    </Col>
  );
};

export default PowerCost;
