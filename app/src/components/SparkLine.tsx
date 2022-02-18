import React from 'react';
import ReactApexChart, { Props } from 'react-apexcharts';

const SparkLine = ({ data, labels, title }: { data: number[]; labels: string[]; title: string }) => {
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
    labels,
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

  return <ReactApexChart options={options} series={[{ name: title, data }]} type="area" height="160" />;
};

export default SparkLine;
