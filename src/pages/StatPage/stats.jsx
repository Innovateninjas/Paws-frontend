import React from 'react';
import Background from '../../Components/backgroundComponent/Background';
import LineChart from './chart'; // Assuming LineChart component is in the same directory

function Stats() {

  
  return (
    <div>
      <Background />
      <div className='flex flex-col justify-center items-center '>
        <h1 className='text-4xl text-[#40025D] leading-relaxed tracking-[8px] bold mt-5 font-bayon'>STATISTICS</h1>
      </div>
      <LineChart  />
    </div>
  );
}

export default Stats;
