import React from "react";
import { Link } from "react-router-dom";
import CustomizedAccordions from "../../../Components/user/FaqComponenet";
import Button from "../../../Components/shared/Button";

const csrftoken = localStorage.getItem('csrftoken');

function SuccessPage() {
  // backend endpoint required to fetch 3 closest NGO info
  const nearNGO = [
    ["name1:  ", "number1"],
    ["name2:  ", "number2"],
    ["name3:  ", "number3"]
  ];

  return (
    <div className="z-[-2] mb-10 min-h-screen bg-custom-gradient flex items-center justify-center p-4 md:p-10">
      <div className="pt-7 w-full max-w-4xl text-center mb-10 flex flex-col items-center gap-5">
        <div className="px-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-800 shadow-dashBoardCardImageShadow flex text-white items-end justify-center text-[4rem] md:text-[7rem]">
          ✓
        </div>
        <p className="text-center text-opacity-90 text-xl md:text-2xl font-breeSerif drop-shadow-2xl tracking-widest font-bold">
          Your report has been submitted successfully.
        </p>
        <div className="flex flex-wrap items-center w-full justify-center gap-4">
          <Button
            text={
              <Link to="/">
                Home
              </Link>
            }
            clas="bg-gradient-to-b from-blue-600 to-blue-800 px-4 py-2 md:px-7 md:py-3 text-sm md:text-base font-semibold"
          />
          {csrftoken ? (
            <Button
              text={
                <Link to="/view-reports">
                  View Reports
                </Link>
              }
              clas="px-4 py-2 md:px-7 md:py-3 text-sm md:text-base font-semibold"
            />
          ) : (
            <Button
              text={
                <Link to="/login">
                  Login
                </Link>
              }
              clas="px-4 py-2 md:px-7 md:py-3 text-sm md:text-base font-semibold"
            />
          )}
        </div>
        <div className="w-full md:w-[92%] bg-red-50 rounded-xl bg-opacity-75 p-5 md:p-8">
          <div className="flex flex-row items-center w-full justify-start">
            <h1 className="mt-1 mb-1 text-xl md:text-2xl font-bold tracking-wider text-red-900 font-breeSerif">
              Contact the nearest NGO if you can!
            </h1>
          </div>
          <div>
            <h3 className="mb-2 text-left">
              These are the closest NGOs. Let them know a streetie needs help!
            </h3>
            <ol className="pl-5 md:pl-10 mb-5 font-bold text-lg font-sans text-left list-decimal">
              <li>{nearNGO[0]}</li>
              <li>{nearNGO[1]}</li>
              <li>{nearNGO[2]}</li>
            </ol>
            <p className="mb-2 text-left">
              Doing this can let the animal receive help quicker.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[92%] mt-12">
          <div className="flex flex-row items-center w-full justify-start">
            <h1 className="mb-3 text-xl md:text-2xl font-bold tracking-wider font-breeSerif">
              Here's what you can do in the meantime
            </h1>
          </div>
          <CustomizedAccordions />
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
