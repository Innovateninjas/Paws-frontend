import React from 'react';
import Background from '../../Components/backgroundComponent/Background';
import LineChart from './LineChart'; 
import { onMessage } from "firebase/messaging";
import { messaging } from '../../firebase';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NgoContext } from '../../contexts/NgoContext';

function Stats() {
  const { NgoData } = useContext(NgoContext);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (NgoData) {
          const response = await axios.get(
            `https://aniresfr-backend.vercel.app/api/animals/?assigned_to=${NgoData.email}`
          );
          const data = response.data;
          setReports(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();


    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("Background message received:", payload);
      // Fetch reports again when a new report is added
      await fetchReports();
    });

    // Clean up function
    return () => {
      unsubscribe();
    };
  }, [NgoData]);
  
  return (
    <div>
      <Background />
      <div className='flex flex-col justify-center items-center '>
        <h1 className='text-4xl text-[#40025D] leading-relaxed tracking-[8px] bold mt-5 font-bayon'>STATISTICS</h1>
      </div>
      <div
        className='bg-neutral-100 min-h-48 w-[90%] opacity-60 rounded-lg shadow-lg mt-10 mx-auto p-5 flex text-center justify-center items-center'
      >
        {isLoading && !reports? (
          <h1>Loading...</h1>
        ) : (
          <LineChart data={reports} />
        )}
      </div>
    </div>
  );
}

export default Stats;
