import React, { useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import styles from '../Donation/Donationfront/donationFront.module.css';
import Background from '../../../Components/shared/Background';
import Button from "../../../Components/shared/Button"
function Donation() {
  const [customAmount, setCustomAmount] = useState(""); // State to store custom amount

  // Function to handle donation button click
  const handleDonate = (amount) => {
    console.log("handleDonate")
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
    console.log("handleCustomAmountDonate")
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
                <Button
                clas=" text-[#40025D] tracking-wider shadow-xl bg-gradient-to-b from-cyan-400 to-cyan-300 flex items-center text-[1.10rem]"
                text={ <> <FaIndianRupeeSign /> 100</>}
                onClick={() => handleDonate(100)}
              />
              <Button
                clas=" text-[#40025D] tracking-wider shadow-xl bg-gradient-to-b from-cyan-400 to-cyan-300 flex items-center text-[1.10rem]"
                text={ <> <FaIndianRupeeSign /> 250</>}
                onClick={() => handleDonate(250)}
              />
              <Button
                clas=" text-[#40025D] tracking-wider shadow-xl bg-gradient-to-b from-cyan-400 to-cyan-300 flex items-center text-[1.10rem]"
                text={ <> <FaIndianRupeeSign /> 500</>}
                onClick={() => handleDonate(500)}
              />
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
              <Button
                clas=""
                onClick={handleCustomAmountDonate}
                text="Donate Now"
              />
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Donation;
