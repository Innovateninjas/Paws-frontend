import React, { useState } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import {
    Line,
} from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
);

const LineChart = ({data}) => {
    const [view, setView] = useState('day'); // Add a state variable for the view

    const convertDataForLineChart = (data) => {
        // Create an object to store the counts for each date
        const countsPerDay = {};

        // Iterate through the data to count reports per day
        data.forEach((report) => {
            // Extract the date without the year from the reported_time
            const reportedDate = new Date(report.reported_time).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit'
            });

            // Increment the count for the reportedDate
            countsPerDay[reportedDate] = (countsPerDay[reportedDate] || 0) + 1;
        });

        // Create an array to hold the dates in the correct order
        const dates = [];
        // Start from the minimum date in the data
        const minDate = new Date(Math.min(...data.map(report => new Date(report.reported_time))));
        // End at the maximum date in the data
        const maxDate = new Date(Math.max(...data.map(report => new Date(report.reported_time))));

        // Iterate through all dates from minDate to maxDate
        for (let currentDate = new Date(minDate); currentDate <= maxDate; currentDate.setDate(currentDate.getDate() + (view === 'day' ? 1 : view === 'week' ? 7 : view === 'month' ? 30 : view === '3months' ? 90 : 365))) {
            // Format the current date without the year
            const formattedDate = currentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit'
            });
            // Add the date to the dates array
            dates.push(formattedDate);
            // If the date doesn't have a count in countsPerDay, set it to 0
            if (!countsPerDay[formattedDate]) {
                countsPerDay[formattedDate] = 0;
            }
        }

        // Extract counts in the same order as dates
        const counts = dates.map(date => countsPerDay[date]);

        return { dates, counts };
    };

    const { dates, counts } = convertDataForLineChart(data);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: '',
                data: counts,
                borderColor: '#40025D',
                tension: 0.5,
            },
        ],
    };

    return (
        <div>
            
            {/* <div className='w-ful flex justify-evenly mb-2'> */}
            <div className='w-ful px-6 pt-3 flex justify-between mb-2'>
                <button onClick={() => setView('day')} 
                style={{backgroundColor: view === 'day' ? 'lightgray' : 'white'}}
                className = " px-2 rounded-lg"
                >Daily
                </button>
                <button onClick={() => setView('week')}
                 style={{backgroundColor: view === 'week' ? 'lightgray' : 'white'}}
                    className="px-2 rounded-lg"
                 >Weekly</button>
                <button onClick={() => setView('month')}
                 style={{backgroundColor: view === 'month' ? 'lightgray' : 'white'}}
                    className="px-2 rounded-lg"
                    >Monthly</button>
                {/* <button onClick={() => setView('3months')} style={{backgroundColor: view === '3months' ? 'lightgray' : 'white'}}>Every 3 Months</button> */}
                <button onClick={() => setView('year')} 
                style={{backgroundColor: view === 'year' ? 'lightgray' : 'white'}}
                className="px-2 rounded-lg"
                >Yearly</button>
            </div>

            <Line
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    elements: { // Specify line styles under the 'elements' key
                        line: {
                            borderColor: 'red',
                            borderWidth: 3,
                            borderCapStyle: 'bevel',
                        },
                        point: {
                            radius: 0,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: view === 'day' ? 'Day' : view === 'week' ? 'Week' : view === 'month' ? 'Month' : view === '3months' ? '3 Months' : 'Year',
                                color: '#40025D',
                                family: 'Sans-serif',
                                font: {
                                    size: 20,
                                    weight: 'bold',
                                    lineHeight:1,
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Reports',
                                color: '#40025D',
                                family:'Sans-serif',
                                font: {
                                    size: 20,
                                    weight: 'bold',
                                }
                            }
                        }
                    },
                }}
            />
        </div>
    )
}

export default LineChart;
