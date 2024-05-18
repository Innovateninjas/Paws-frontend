import React, { useEffect, useState } from 'react';
import Background from '../../../Components/shared/Background';
import LineChart from './LineChart';
import axios from 'axios';
import calculateAverageResponseTime from './avgResposneTimeCalc';
import PieChart from './pieChart';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import Notification from '../../../Components/ngo/Notification';
function Stats() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageResponseTime, setAverageResponseTime] = useState(null);
  

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${url}/api/animals`);
        const data = response.data;
        setReports(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (reports) {
      const averageResponseTime = calculateAverageResponseTime(reports);
      setAverageResponseTime(averageResponseTime);
    }
  }, [reports]);

  const handleClick = () => {
    console.log('Notification clicked!');
    
  };
  return (
    <>
  {/* {console.log(reports)} */}
      <Background />
      <Notification onClick={handleClick}
      reports={reports}/>
      <div className='p-8 pt-0'>
        <div className='flex flex-col justify-center items-center '>
          {/* <h1 className='text-4xl text-[#40025D]  tracking-[8px] bold  font-bayon'>STATISTICS</h1> */}
          <h1 className='text-[3rem] text-white  tracking-[8px]  font-bayon md:text-[4rem]'>STATISTICS</h1>
        </div>
        <div className='px-[2.4rem] pt-2 mb-8 border-blue-200 mt-8 backdrop-blur-sm rounded-[2rem] md:mx-[5rem] px-[4rem]'>
        {/* <h1 className='ml-2 mt-6 mb-2 underline underline-offset-4 text-white font-Calistoga tracking-wide text-xl'>Number of reports</h1> */}
        <h1 className='ml-2 mt-2 mb-3 text-white font-Calistoga tracking-wide text-[1.6rem]'>Number of reports</h1>
        {/* <div className='backdrop-blur-sm bg-white/30 cursor-pointer min-h-48  mb-9 rounded-2xl shadow-lg  mx-auto  flex text-center justify-center items-center'> */}
        <div className='pb-4 backdrop-blur-sm bg-white/30 cursor-pointer min-h-48  mb-9 rounded-2xl shadow-lg  mx-auto'>
          {isLoading && !reports ? (
            <h1>Loading...</h1>
          ) : (
            <LineChart data={reports} />
          )}
        </div>

        {/* <h1 className='ml-2 mt-6 mb-2 underline underline-offset-4 text-white font-Calistoga tracking-wide text-xl'> */}
        <h1 className='ml-2 mt-6 mb-3 text-white font-Calistoga tracking-wide text-[1.6rem]'>
          Heatmap of Reported Animals
        </h1>
        
        <MapContainer center={[22.5722, 88.3639]} zoom={13} style={{ height: "300px", width: "100%" }} className='backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg mx-auto flex text-center justify-center mb-9 items-center'>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='<a>Paws</a>'
          />
          {reports && !isLoading && (
            <HeatmapLayer data={reports}
            radius={70}
            blur={15}
            gradient={{
              0.1: 'blue',
              0.3: 'cyan',
              0.6: 'lime',
              0.7: 'yellow',
              0.8: 'orange',
              1.0: 'red'
            }}/>
          )}
        </MapContainer>

        {/* <h1 className='ml-2 mt-6 mb-2 underline underline-offset-4 text-white font-Calistoga tracking-wide text-xl'> */}
        <h1 className='ml-2 mt-6 mb-2 text-white font-Calistoga tracking-wide text-[1.6rem]'>
          Reported Animal Types
        </h1>
        <div className='cursor-pointer backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg mx-auto flex text-center justify-center mb-9 items-center'>
          {isLoading && !reports ? (
            <h1>Loading...</h1>
          ) : (
            <PieChart data={reports} />
          )}
        </div>

        <div className='cursor-pointer backdrop-blur-sm bg-white/30 rounded-lg min-h-5 shadow-lg '>
          <h1 className='ml-2 mt-6 mb-2 text-white font-Calistoga tracking-wide text-[1.6rem]'>Average Response Time : </h1>
          <h1 className='ml-2'>
            {averageResponseTime ? (
              averageResponseTime.split(' ').map((part, index) => (
                isNaN(part) ? ( 
                  <span key={index}>{part} </span>
                ) : ( 
                    <span key={index} style={{ color: '#40025D',fontWeight:'bold',marginRight:'2px' ,  fontSize:"18px" }}>{part} </span>
                )
              ))
            ) : (
              "Loading..."
            )}
          </h1>
        </div>

        <div className='min-h-[100px]'></div>
        </div>
      </div>
    </>
  );
}

function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    const heatmapData = data.map(report => [report.latitude, report.longitude, 1]);
    const heatmapOptions = {
      radius: 25,
      blur: 15,
      max: 1.0,
    };
    L.heatLayer(heatmapData, heatmapOptions).addTo(map);
  }, [data, map]);

  return null;
}

export default Stats;

