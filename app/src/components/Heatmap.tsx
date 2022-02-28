import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const options: ApexOptions = {
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
    text: 'Consumo por día y hora',
  },
};

const Heatmap = ({
  consumptions,
}: {
  consumptions: any[];
}): JSX.Element | null =>
  !consumptions.length ? null : (
    <ReactApexChart options={options} series={consumptions} type="heatmap" />
  );

export default Heatmap;
