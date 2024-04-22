// import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LINE_CHART } from '../assets/constant/constant';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        // title: {
        //     display: true,
        //     text: 'Line Chart',

        // },
    },
};

export default function Linechart() {
    return (
        <>
            <Line options={options} data={LINE_CHART} width={'6px'} height={'4px'} />
        </>
    );
}
