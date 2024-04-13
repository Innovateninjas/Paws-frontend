// SuccessPage.js
import React from "react";
import { Link } from "react-router-dom";
import Background from "../../../Components/backgroundComponent/Background";
import CustomizedAccordions from "../../../Components/FAQ/FAQ";


function SuccessPage() {


  const containerStyle = {
    width: '155px',
    height: '50px',
    background: 'linear-gradient(180deg, rgba(158, 135, 250, 0.35) 0%, rgba(74, 46, 252, 0.54) 100%)',
    boxShadow: '0px 47.54999923706055px 39.68747329711914px rgba(30, 133, 228, 0.26)',
    borderRadius: '88.64px',
    backdropFilter: 'blur(79.37px)',
  };
  return (
    <div className="relative z-[3] h-fit w-full flex flex-col gap-3 justify-center items-center overflow-x-hidden mb-10 ">
      <Background />
      <div className="w-full h-60vh text-center mt-16  mb-10 pt-[7.5rem] flex flex-col items-center gap-5 justify-center">
        <h2 className="text-purple-950 text-5xl font-normal font-['Bayon'] tracking-widest">Success</h2>
        <div className="w-354 h-354 transform p-6  text-6xl origin-top-left bg-gradient-to-b from-green-300 to-purple-500 shadow-lg rounded-full shadow-black-900/60">✓</div>
        <p  className="w-89 h-32 text-center text-indigo-950 text-opacity-90 text-2xl  font-['Bree Serif'] tracking-widest font-bold">Your report has been successfully submitted</p>
        <div className="flex flex-row items-center w-full justify-evenly">
          <Link to="/" className="w-472 h-175 bg-opacity-40 bg-white shadow-lg rounded-full border-3 p-3 backdrop-blur-2xl text-black text-xl font-normal font-bakbak-one  shadow-black-900/60 hover:shadow-indigo-500/40 ">
            Back to Home
          </Link>
          <Link to="/view-reports" style={containerStyle} className="text-black pt-3 text-xl font-normal font-bakbak-one shadow-black-900/60">
            View Reports
          </Link>
        </div>
        <div className="w-[92%] mt-6 ">
          <div className=" flex flex-row items-center w-full justify-start">
            <h1 className="pl-3 mb-1 text-2xl text-bold tracking-wider  font-breeSerif ">Here Is what you can do </h1>
          </div>
          <CustomizedAccordions />
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
