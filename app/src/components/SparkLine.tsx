import React from 'react';
import ReactApexChart, { Props } from 'react-apexcharts';
import { Consumption } from '../actions';

const SparkLine = ({ consumptions, title }: { consumptions: Consumption; title: string }) => {
  const options: Props = {
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 1,
    },
    chart: {
      group: 'sparklines',
      sparkline: {
        enabled: true,
      },
    },
    labels: new Array(24).fill(0).map((_, n) => `2018-09-0${n + 1}`),
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      type: 'datetime',
    },
    colors: ['#DCE6EC'],
    title: {
      text: '0',
      offsetX: 30,
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    subtitle: {
      text: title,
      offsetX: 30,
      style: {
        fontSize: '14px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[{ name: title, data: new Array(24).fill(10) }]}
      type="area"
      height="160"
    />
  );
};

export default SparkLine;
