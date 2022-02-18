import React from 'react';
import ReactApexChart, { Props as ReactChartProps } from 'react-apexcharts';

type Props = {
  data: number[];
  labels: string[];
  title: string;
  subtitle: string;
};

const SparkLine = ({ data, labels, title, subtitle }: Props): JSX.Element => {
  const options: ReactChartProps = {
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
      text: title,
      offsetX: 30,
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    subtitle: {
      text: subtitle,
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
