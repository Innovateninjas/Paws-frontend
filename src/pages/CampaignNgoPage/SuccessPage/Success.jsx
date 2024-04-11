import React from "react";
import { TypeAnimation } from 'react-type-animation';
const Success = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-emerald-300 to-cyan-600">
      <h1 className="text-3xl font-bold no-underline">
        <div className="bg-gradient-to-b from-emerald-300 to-cyan-400 p-2 md:p-10 md:px-5 rounded-2xl  shadow-dashBoardCardImageShadow">
        Campaign Created <br />  <TypeAnimation
                      sequence={[
                       "Successfully",
                        1000,
                      ]} 
                      wrapper="span"
                      speed={0.1}
                      />

        </div>
        <div className="pt-4">
        <button className="text-white rounded-lg bg-gradient-to-b from-emerald-300 to-emerald-600 shadow-md p-5 mt-1.75rem text-lg font-semibold outline-none">Back to DashBoard</button>
        </div>
      </h1>
    </div>
  );
};

export default Success;
