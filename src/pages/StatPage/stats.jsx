import React, {  useEffect, useState } from 'react';
import Background from '../../Components/backgroundComponent/Background';
import LineChart from './LineChart';
import axios from 'axios';
import findMostReportedAnimal from './mostReportedAnimal';
import calculateAverageResponseTime from './avgResposneTimeCalc';

function Stats() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageResponseTime, setAverageResponseTime] = useState(null);
  const [mostReportedAnimal, setMostReportedAnimal] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `https://aniresfr-backend.vercel.app/api/animals`
        );
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
      const mostReportedAnimal = findMostReportedAnimal(reports);
      setMostReportedAnimal(mostReportedAnimal);
    }
  }
    , [reports]);
  return (
    <>
      <Background />
      <div className='p-8'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-4xl text-[#40025D]  tracking-[8px] bold  font-bayon'>STATISTICS</h1>
        </div>
        <h1 className='ml-2 mt-6 mb-2 underline underline-offset-4 text-[#40025D] font-Calistoga tracking-wide text-xl'>Number of reports perday</h1>
        <div
          className='backdrop-blur-sm bg-white/30 min-h-48   rounded-lg shadow-lg  mx-auto  flex text-center justify-center items-center'
        >
          {isLoading && !reports ? (
            <h1>Loading...</h1>
          ) : (
            <LineChart data={reports} />
          )}
        </div>
        <div className='backdrop-blur-sm  bg-white/30 rounded-lg min-h-5 shadow-lg '>
          <h1 className='ml-2 mt-6 mb-2  text-black font-Calistoga tracking-wide text-xl'>Average Response Time : </h1>
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
        <div className='backdrop-blur-sm mt-7 bg-white/30 rounded-lg min-h-5 shadow-lg '>
          <h1 className='ml-2 mt-1 mb-2  text-black font-Calistoga tracking-wide text-xl inline-block'>Most Reported Animal : </h1>
          <h1 className='ml-2 [text-#40025D] tracking-wider inline-block text-[1.4rem]'>
            {mostReportedAnimal? (
              mostReportedAnimal
            ) : (
              "Loading..."
            )}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Stats;
