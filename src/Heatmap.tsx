import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const options: ApexOptions = {
    chart: {
        type: 'heatmap',
    },
    plotOptions: {
        heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
            colorScale: {
                ranges: [
                    {
                        from: 0,
                        to: 0.15,
                        name: 'low',
                        color: '#ffffff',
                    },
                    {
                        from: 0.15,
                        to: 0.3,
                        name: 'medium',
                        color: '#4e5265',
                    },
                    {
                        from: 0.3,
                        to: 0.75,
                        name: 'high',
                        color: '#fff200',
                    },
                    {
                        from: 0.75,
                        to: 5,
                        name: 'extreme',
                        color: '#ff6800',
                    },
                ],
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    colors: ['#008FFB'],
    title: {
        text: 'Consumo por día y hora',
    },
};

const Heatmap = ({ consumptions }: { consumptions: any[] }) =>
    !consumptions.length ? null : <ReactApexChart options={options} series={consumptions} type="heatmap" />;

export default Heatmap;
