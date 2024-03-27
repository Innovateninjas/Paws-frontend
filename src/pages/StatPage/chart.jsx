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



const LineChart = () => {
    // Convert the data for the LineChart component
    const data = [
        {
            "id": 95,
            "user_name": "Rishi Paul",
            "user_email": "paul@gmail.com",
            "user_phone": "9147092032",
            "animal_type": "cat",
            "numberOfAnimals": "one",
            "description": "bruised",
            "condition": "Urgent",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1710317675/sbh/pgou4ka958xnq89hkqaf.jpg",
            "latitude": 22.5576432,
            "longitude": 88.3972751,
            "address": "RCC INSTITUTE OF INFORMATION TECHNOLOGY (NEW BUILDING), Rcc Institute Of Information Technology (Old Campus), Pagla Danga Rd, Tangra, Kolkata, West Bengal 700010, India",
            "landmark": "N217",
            "status": "Received",
            "reported_time": "2024-03-13T08:18:26.756782Z",
            "response_time": "2024-03-14T08:18:25.440596Z",
            "assigned_to": "voa2@gmail.com"
        },
        {
            "id": 97,
            "user_name": "Rishi Paul",
            "user_email": "paul@gmail.com",
            "user_phone": "9147092032",
            "animal_type": "dog",
            "numberOfAnimals": "one",
            "description": "serious bleeding",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1710839759/sbh/wxkyffbyrf2sp6qrjplg.jpg",
            "latitude": 22.557711,
            "longitude": 88.3973498,
            "address": "Sdf-4, PARIDHAN GARMENTS PARK, Pagla Danga Rd, Tangra, Kolkata, West Bengal 700010, India",
            "landmark": "Room 414",
            "status": "Received",
            "reported_time": "2024-03-19T09:16:29.200290Z",
            "response_time": "2024-03-20T09:16:27.754952Z",
            "assigned_to": "voa2@gmail.com"
        },
        {
            "id": 99,
            "user_name": "dsdsd",
            "user_email": "aditi.ghosh40@outlook.com",
            "user_phone": "1234567890",
            "animal_type": "cat",
            "numberOfAnimals": "Two",
            "description": "dsd",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711304030/sbh/q9mvnph1zn4j7pvcwijm.png",
            "latitude": 22.49107,
            "longitude": 88.318197,
            "address": "15-52, 18 Bigha, Muradpur, Behala, Kolkata, West Bengal 700034, India",
            "landmark": "dsds",
            "status": "Received",
            "reported_time": "2024-03-24T18:14:09.254711Z",
            "response_time": "2024-03-25T18:14:07.903633Z",
            "assigned_to": "voa@gmail.com"
        },
        {
            "id": 101,
            "user_name": "dsdsd",
            "user_email": "aditi.ghosh40@outlook.com",
            "user_phone": "1234567890",
            "animal_type": "cat",
            "numberOfAnimals": "Two",
            "description": "dsd",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711304788/sbh/tl9covqbizcwqkg9brl3.png",
            "latitude": 22.49107,
            "longitude": 88.318197,
            "address": "15-52, 18 Bigha, Muradpur, Behala, Kolkata, West Bengal 700034, India",
            "landmark": "dsd",
            "status": "Received",
            "reported_time": "2024-03-24T18:26:37.148617Z",
            "response_time": "2024-03-25T18:26:35.814405Z",
            "assigned_to": "voa@gmail.com"
        },
        {
            "id": 111,
            "user_name": "Arnab Mondal",
            "user_email": "aryan1@gmail.com",
            "user_phone": "6291912672",
            "animal_type": "dog",
            "numberOfAnimals": "one",
            "description": "serious bleeding",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711382026/sbh/qtxgkxkwz3c1ytl5afrc.jpg",
            "latitude": 22.4690176,
            "longitude": 88.4047872,
            "address": "A6, Mauza, Dhelua Mauza, Panchpota, Kolkata, West Bengal 700152, India",
            "landmark": "ello",
            "status": "Received",
            "reported_time": "2024-03-25T15:54:12.479894Z",
            "response_time": "2024-03-26T15:54:11.178749Z",
            "assigned_to": "aryan10@gmail.com"
        },
        {
            "id": 113,
            "user_name": "qazxsw",
            "user_email": "example645@gmail.com",
            "user_phone": "8777061993",
            "animal_type": "dog",
            "numberOfAnimals": "one",
            "description": "serious bleeding",
            "condition": "Normal",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711386183/sbh/bptxmjjixougplo1rbqn.jpg",
            "latitude": 22.5550327,
            "longitude": 88.3573137,
            "address": "63, Rafi Ahmed Kidwai Rd, Esplanade, Taltala, Kolkata, West Bengal 700016, India",
            "landmark": "xxxx",
            "status": "Received",
            "reported_time": "2024-03-25T18:00:48.063985Z",
            "response_time": "2024-03-26T18:00:46.730484Z",
            "assigned_to": "voa2@gmail.com"
        },
        {
            "id": 119,
            "user_name": "sdada",
            "user_email": "shreyashaw@gmail.com",
            "user_phone": "1234567891",
            "animal_type": "dog",
            "numberOfAnimals": "Two",
            "description": "dddd",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711473411/sbh/xj4loic2twqzz0swvhqj.webp",
            "latitude": 22.5550391,
            "longitude": 88.36945,
            "address": "24B, Entally, Kolkata, West Bengal 700014, India",
            "landmark": "dddd",
            "status": "Received",
            "reported_time": "2024-03-26T17:33:48.258919Z",
            "response_time": "2024-03-27T17:33:46.932158Z",
            "assigned_to": "voa2@gmail.com"
        },
        {
            "id": 98,
            "user_name": "a@aa.com",
            "user_email": "a@aa.com",
            "user_phone": "1212232111",
            "animal_type": "dog",
            "numberOfAnimals": "One",
            "description": "asdsada",
            "condition": "Urgent",
            "image": "data:,",
            "latitude": 23.5204443,
            "longitude": 87.3119227,
            "address": "1/63, Sarada Nagar, Durgapur, West Bengal 713203, India",
            "landmark": "asdasdada",
            "status": "Received",
            "reported_time": "2024-03-24T10:50:48.625990Z",
            "response_time": "2024-03-25T10:50:47.284180Z",
            "assigned_to": "voa2@gmail.com"
        },
        {
            "id": 100,
            "user_name": "Rishi Paul",
            "user_email": "paul@gmail.com",
            "user_phone": "9147092032",
            "animal_type": "cat",
            "numberOfAnimals": "Two",
            "description": "Bruh",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711304316/sbh/fyey93vdpzjwge2kxae7.png",
            "latitude": 22.4911653,
            "longitude": 88.3182094,
            "address": "15-40-A, 18 Bigha, Muradpur, Behala, Kolkata, West Bengal 700034, India",
            "landmark": "Cringe",
            "status": "Received",
            "reported_time": "2024-03-24T18:18:51.844046Z",
            "response_time": "2024-03-25T18:18:50.514534Z",
            "assigned_to": "voa@gmail.com"
        },
        {
            "id": 102,
            "user_name": "dsdsd",
            "user_email": "aditi.ghosh40@outlook.com",
            "user_phone": "1234567890",
            "animal_type": "cat",
            "numberOfAnimals": "Two",
            "description": "fdfdf",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711304947/sbh/yjmtoyienbv0gk297a37.jpg",
            "latitude": 22.49107,
            "longitude": 88.318197,
            "address": "15-52, 18 Bigha, Muradpur, Behala, Kolkata, West Bengal 700034, India",
            "landmark": "gay",
            "status": "Received",
            "reported_time": "2024-03-24T18:29:20.508886Z",
            "response_time": "2024-03-25T18:29:19.175294Z",
            "assigned_to": "voa@gmail.com"
        },
        {
            "id": 112,
            "user_name": "qazxsw",
            "user_email": "example645@gmail.com",
            "user_phone": "8777061993",
            "animal_type": "dog",
            "numberOfAnimals": "one",
            "description": "serious bleedingc",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711383328/sbh/j7pujk7p0rxx2voxm9mh.jpg",
            "latitude": 22.5550327,
            "longitude": 88.3573137,
            "address": "63, Rafi Ahmed Kidwai Rd, Esplanade, Taltala, Kolkata, West Bengal 700016, India",
            "landmark": "dd",
            "status": "Received",
            "reported_time": "2024-03-25T16:19:44.294086Z",
            "response_time": "2024-03-26T16:19:42.914786Z",
            "assigned_to": "voa2@gmail.com"
        },
        {
            "id": 114,
            "user_name": "Rishi Paul",
            "user_email": "paul@gmail.com",
            "user_phone": "9147092032",
            "animal_type": "cat",
            "numberOfAnimals": "one",
            "description": "serious bleeding",
            "condition": "Critical",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1711449935/sbh/syfo0sbp30wmeyiridqe.jpg",
            "latitude": 22.4912641,
            "longitude": 88.3180846,
            "address": "15, 39, James Long Sarani, 18 Bigha, Muradpur, Sarada Pally, Kolkata, West Bengal 700034, India",
            "landmark": "In her bed",
            "status": "Received",
            "reported_time": "2024-03-26T10:50:58.688463Z",
            "response_time": "2024-03-27T10:50:57.164313Z",
            "assigned_to": "voa@gmail.com"
        },
        {
            "id": 96,
            "user_name": "Arnab Mondal",
            "user_email": "aryan1@gmail.com",
            "user_phone": "6291912672",
            "animal_type": "cattle",
            "numberOfAnimals": "Two",
            "description": "bruised",
            "condition": "Normal",
            "image": "https://res.cloudinary.com/dff97ky68/image/upload/v1710508314/sbh/mzjvsn29n7lb8wsezlua.jpg",
            "latitude": 22.47947,
            "longitude": 88.4111036,
            "address": "36, Daspara, Panchpota, Kolkata, West Bengal 700075, India",
            "landmark": "Haha",
            "status": "Rescued",
            "reported_time": "2024-03-15T13:12:04.886991Z",
            "response_time": "2024-03-26T18:45:14.396000Z",
            "assigned_to": "aryan10@gmail.com"
        }
    ]
    const { dates, counts } = convertDataForLineChart(data);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Number of Reports per Day',
                data: counts,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.5,
            },
        ],
    };

    return (
        <div>
            <Line
                data={chartData}
            // options={options? options : {}}
            ></Line>
        </div>
    )
}

export default LineChart;
