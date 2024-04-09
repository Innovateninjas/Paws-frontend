import React, { useState } from 'react';
import styles from "./Donation.module.css";
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
  };

  // Function to handle custom amount donate button click
  const handleCustomAmountDonate = () => {
    if (customAmount !== "") {
      handleDonate(customAmount);
    }
  };

  return (

    <div className="relative z-[3] h-fit w-full flex flex-col gap-3 justify-center items-center overflow-x-hidden px-4">
    <Background />
    <div className="bg-adbd7f w-full h-[784px]  flex flex-col items-center ">
      <div className="imgContainer  pb-[5.25rem]">
          <img src="./images/Donation.png" alt='' />
          <h2 className="w-[25rem]  z-[30] bg-white rounded-3xl bg-opacity-57 backdrop-blur-[5px] shadow-lg ring-1 ring-gray-300 text-center pb-3 pt-3 flex justify-center items-center flex-col"> <span className="text-purple-700 text-[1.6rem]">HELP US BRIGHTEN THEIR LIVES!</span></h2>
        </div>
        <div className="w-30">
        <div className="bg-c4c29d p-8 flex flex-col items-center justify-center gap-4 shadow-md mb-6 h-[35rem] w-[22rem] z-[30] bg-white rounded-[3.5rem] bg-opacity-57  shadow-lg ring-1 ring-gray-300">
          <p className="text-center p-[0.5rem] ">Your generous donations play a crucial role in caring for our little friends and helping them find their forever homes.</p>
          <div className="pt-[0.5rem] w-auto flex flex-col items-center justify-center gap-[1.0rem] border-t border-black">
            <div className="flex items-center justify-center gap-[1.6rem]">
              {/* On button click, call handleDonate function with the corresponding amount */}
              <button className="text-purple-650 text-[1.125rem] p-[0.1rem] font-normal font-BaiJamjuree bg-gradient-to-b from-teal-400 via-teal-200 to-teal-400 shadow-lg rounded-full border-silver border-2 backdrop-blur-4xl"onClick={() => handleDonate(100)}>100 rupees</button>
              <button className="text-purple-650 text-[1.125rem] p-[0.1rem] font-normal font-BaiJamjuree bg-gradient-to-b from-teal-400 via-teal-200 to-teal-400 shadow-lg rounded-full border-silver border-2 backdrop-blur-4xl" onClick={() => handleDonate(250)}>250 rupees</button>
              <button className="text-purple-650 text-[1.125rem] p-[0.1rem] font-normal font-BaiJamjuree bg-gradient-to-b from-teal-400 via-teal-200 to-teal-400 shadow-lg rounded-full border-silver border-2 backdrop-blur-4xl" onClick={() => handleDonate(500)}>500 rupees</button>
            </div>
            <h2>OR</h2>
            <label className={styles.amt} htmlFor="password">Custom Amount</label>
            <div className={styles.gap}>
              <input type="number" id="amount" name="rupees" placeholder="Enter custom amount..." value={customAmount} onChange={handleCustomAmountChange} required />
            </div>
            <div className={styles.donatebtn}>
              {/* On click, call handleCustomAmountDonate function */}
              <button className="mb-24 rounded-3xl font-bold bg-white px-16 py-4 bg-gradient-to-b from-grey-800 to-grey-800 text-blue shadow-lg opacity-50" onClick={handleCustomAmountDonate}>Donate now!</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Donation;
