import React from 'react';
import ReactApexChart, { Props as ReactChartProps } from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

type Props = {
  data: number[];
  labels: string[];
  title: string;
  subtitle: string;
  formatter: (value: number) => string;
};

const SparkLine = ({
  data,
  labels,
  title,
  subtitle,
  formatter,
}: Props): JSX.Element => {
  const { t } = useTranslation();

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
    tooltip: {
      x: {
        formatter: (val: number) => {
          return t('date', {
            val: new Date(val),
            formatParams: {
              val: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              },
            },
          });
        },
      },
      y: {
        formatter,
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[{ name: title, data }]}
      type="area"
      height="160"
    />
  );
};

export default SparkLine;
