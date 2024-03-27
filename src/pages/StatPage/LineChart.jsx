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
    for (let currentDate = new Date(minDate); currentDate <= maxDate; currentDate.setDate(currentDate.getDate() + 1)) {
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



const LineChart = ({data}) => {
    
    const { dates, counts } = convertDataForLineChart(data);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Number of Reports per Day',
                data: counts,
                borderColor: '#40025D',
                tension: 0.5,
            },
        ],
    };

    return (
        <div>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    elements: { // Specify line styles under the 'elements' key
                        line: {
                            borderColor: 'red',
                            borderWidth: 4,
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
                                text: 'Date',
                                color: '#0B0553DE',
                                family: 'Sans-serif',
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                    lineHeight:0,
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Reports',
                                color: '#0B0553DE',
                                family:'Sans-serif',
                                font: {
                                    size: 12,
                                    weight: 'bold',

                                }
                            }
                        }
                    },
                    // borderColor: '#40025D',
                }}
            />
        </div>
    )
}

export default LineChart;
