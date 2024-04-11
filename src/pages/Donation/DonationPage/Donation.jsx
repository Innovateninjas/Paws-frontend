import React, { useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import styles from './..//Donationfront/donationFront.module.css';
import Background from '../../../Components/backgroundComponent/Background';
function Donation() {
  const [customAmount, setCustomAmount] = useState(""); // State to store custom amount

  // Function to handle donation button click
  const handleDonate = (amount) => {
    const upiLink = `upi://pay?pa=rishipaulstudy@okhdfcbank&pn=Rishi%20Paul&am=${amount}&cu=INR&aid=uGICAgMCerK_8eg`;
    window.location.href = upiLink;
  };
  // Function to handle custom amount input change
  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
  };

  // Function to handle custom amount donate button click
  const handleCustomAmountDonate = () => {
    if (customAmount !== "") {
      handleDonate(customAmount);
    }
  };

  return (

    <div className="relative z-[3] font-baijam h-fit w-full flex flex-col gap-3 justify-center items-center overflow-x-hidden px-4 text-[#40025D] ">
    <Background />
    <div className="h-screen flex items-center">
    <div className="w-full flex flex-col items-center gap-8">
      <div className=" relative">
          <img className={styles.image} src="./images/Donation.png" alt='' />
          <h2 className="bg-white font-breeSerif rounded-3xl bg-opacity-57 backdrop-blur-[5px] shadow-dashBoardCardImageShadow px-4 text-center pb-3 pt-3 flex justify-center items-center flex-col"> <span className="text-[#40025D] font-bold animate-fade-in-donation text-[1.6rem] ">HELP US BRIGHTEN THEIR LIVES!</span></h2>
        </div>
        <div className="w-30">
        {/* CONATINER */}
        <div className=" bg-white flex flex-col items-center justify-center gap-4 shadow-dashBoardCardImageShadow rounded-[40px] bg-opacity-35 p-2 pb-4 backdrop-blur-[5px]">
          <p className="text-center p-3 text-[#0b0553de] drop-shadow-xl text-[1.20rem] border-b border-black ">Your generous donations play a crucial role in caring for our little friends and helping them find their forever homes.</p>
          <div className="flex flex-col items-center justify-center gap-[1.0rem]">
            <div className="flex items-center justify-center gap-2">
            {/* BUTTONS */}
                <button className="inset-0 text-[1.10rem] text-[#40025D] tracking-wider font-semibold font-baijam bg-gradient-to-b from-donationButtonTop to-donationButtonBottom shadow-xl rounded-[30px] py-3 px-4 bg-opacity-47 drop-shadow-lg flex items-center justify-center" onClick={() => handleDonate(100)}><FaIndianRupeeSign />100
                </button>
              <button className="inset-0 text-[1.10rem] text-[#40025D] tracking-wider font-semibold font-baijam bg-gradient-to-b from-donationButtonTop to-donationButtonBottom shadow-xl rounded-[30px] py-3 px-4  bg-opacity-47 flex items-center justify-center" onClick={() => handleDonate(250)}>
              <FaIndianRupeeSign />250
              </button>
              <button className="inset-0 text-[1.10rem] text-[#40025D] tracking-wider font-semibold font-baijam bg-gradient-to-b from-donationButtonTop to-donationButtonBottom shadow-xl rounded-[30px] py-3 px-4 bg-opacity-47 flex items-center justify-center" onClick={() => handleDonate(500)}><FaIndianRupeeSign />500</button>
            </div>
            {/* CUSTOM AMOUNT */}
            <div className="text-center text-[20px]">
            <h2>OR</h2>
            <label  htmlFor="password">Custom Amount</label>
            </div>
            <div className='w-full'>
              <input className="w-full outline-0 placeholder-stone inset-0 text-[#40025D] font-semibold font-baijam bg-white bg-opacity-50 shadow-dashBoardCardImageShadow rounded-[30px]  py-3 px-4" type="text" id="amount" name="rupees" placeholder="Enter custom amount..." value={customAmount} onChange={handleCustomAmountChange} required />
            </div>
              {/* On click, call handleCustomAmountDonate function */}
              <button className="text-white focus:outline-none rounded-[30px] shadow-buttonShadow bg-gradient-to-b from-green-300 to-green-800 py-3 px-4 text-[1.5rem]" onClick={handleCustomAmountDonate}>Donate now!</button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Donation;
