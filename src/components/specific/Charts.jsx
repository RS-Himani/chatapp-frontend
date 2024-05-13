import React from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import { ArcElement, 
    CategoryScale, 
    Chart as ChartJS, 
    Filler, 
    Legend, 
    LineElement, 
    LinearScale, 
    PointElement, 
    Tooltip 
} from "chart.js";
import { gray, lightBlue, purple, purpleLight, lightBlueBG, } from '../../constants/color';
import { getLast70days } from '../../libs/features';

ChartJS.register(
    CategoryScale,
    Tooltip,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    ArcElement,
    Legend
);

const labels = getLast70days();

const lineChartOptions = {
    responsive: true,
    plugin: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
};

const LineChart = ({ value=[] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Message",
                fill: true,
                backgroundColor: purpleLight,
                borderColor: purple,
            },
        ],
    };

    return <Line data={data} options={lineChartOptions} />
};

const doughnutChartOptions = {
    responsive: true,
    plugin: {
        legend: {
            display: false,
        },
    },
    cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                offset:20,
                backgroundColor: [purpleLight, lightBlueBG],
                hoverBackgroundColor: [gray],
                borderColor: [purple, lightBlue],
            },
        ],
    };

    return (
        <Doughnut 
            style={{ zIndex: 10 }}
            data={data} 
            options={doughnutChartOptions} 
        />);
};

export { LineChart, DoughnutChart };