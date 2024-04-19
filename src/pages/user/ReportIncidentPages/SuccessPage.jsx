import React from "react";
import { Link } from "react-router-dom";
import CustomizedAccordions from "../../../Components/user/FaqComponenet";
import Button from "../../../Components/shared/Button";
const csrftoken = localStorage.getItem('csrftoken');


function SuccessPage() {

  // console.log(csrftoken)

  return (
    <div className="z-[-2] mb-10 min-h-screen max-h-fit bg-custom-gradient top-0 w-full flex items-center">
      <div className="pt-7 w-full text-center mb-10 flex flex-col items-center gap-5 justify-center">
        {/* <h2 className="text-[#40025D] w-screen text-5xl font-normal font-['Bayon'] tracking-widest drop-shadow-2xl">Success</h2> */}
        <div className=" px-10 rounded-[50%] bg-gradient-to-br from-blue-400 to-blue-800 shadow-dashBoardCardImageShadow flex text-white items-end justify-center text-[7rem] ">✓</div>
        <p className="text-center text-opacity-90 text-2xl font-breeSerif drop-shadow-2xl tracking-widest font-bold">Your report has been submitted successfully. </p>
        <div className="flex flex-row items-center w-full justify-center gap-4">
          <Button
            text={
              <Link to="/">
                Home
              </Link>
            }
            clas="bg-gradient-to-b from-blue-600 to-blue-800 px-7 py-3 font-semibold"
          />
          {
            csrftoken ? (
              <Button
                text={
                  <Link to="/view-reports">
                    View Reports
                  </Link>
                }
                clas="px-7 py-3 font-semibold"
              />
            ) : (
              <Button
                text={
                  <Link to="/login">
                    Login
                  </Link>
                }
                clas="px-7 py-3 font-semibold"
              />
            )
          }
        </div>
        <div className="w-[92%] mt-12 ">
          <div className=" flex flex-row items-center w-full justify-start">
            <h1 className="pl-2 mb-1 text-2xl text-bold tracking-wider  font-breeSerif ">Here Is what you can do </h1>
          </div>
          <CustomizedAccordions />
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
