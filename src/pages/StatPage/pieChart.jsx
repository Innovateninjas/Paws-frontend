
import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Pie } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

const PieChart = ({ data }) => {
    // Count occurrences of each animal type
    const animalCount = data.reduce((acc, curr) => {
        acc[curr.animal_type] = (acc[curr.animal_type] || 0) + 1;
        return acc;
    }, {});

    // Extract animal types and counts for chart data
    const labels = Object.keys(animalCount);
    const counts = Object.values(animalCount);

    // Define colors for different animal types
    const colors = ['#FCB2E7', '#1E85E47D','#B25CDB', '#33FF9C', '#339CFF', '#FFC300', '#FF5733']; // Add more colors if needed

    // Create data object for the chart
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'report count',
                data: counts,
                backgroundColor: colors.slice(0, labels.length), // Use only required number of colors
            },
        ],
    };

    // Define and register the custom plugin to set background color
    const customCanvasBackgroundColorPlugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Set your desired background color here
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };
    ChartJS.register(customCanvasBackgroundColorPlugin);

    return (
        <div>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 15, 
                                    style: 'italic',
                                },
                                color: '#40025D;',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default PieChart;
// background: #40025D;
