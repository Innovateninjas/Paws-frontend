import React, { useEffect, useState, useContext } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiCoinsLine } from "react-icons/ri";
import Loader from "../../Components/loaders/loader";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function UserPage() {
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext);

  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);

  // useEffect(() => {
  //   console.log(userDetails); // log userDetails to the console
  // }, [userDetails]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <Loader visible />;
  }

  if (userDetails) {
    return (
      <div className="flex flex-col font-Calistoga items-center justify-center gap-[30px] h-screen bg-gradient-to-b from-[#7DFFA1] to-[#4B77E9]">
        <div className="w-60 h-60 rounded-[50%] shadow-dashBoardCardImageShadow  ">
          <img className="" src="./images/profileIcon.png" alt="icon" />
        </div>
        {/* <div className="flex flex-col items-center w-full max-w-3xl"> */}
        <div className=" w-80 p-5 border-1 flex flex-col gap-[15px] rounded-[30px]  ring-1 ring-gray-300 bg-opacity-35 bg-white shadow-dashBoardCardImageShadow backdrop-blur-[5px]">
          {/* NAME */}
          <div className="flex gap-1 items-center text-xl drop-shadow-md">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <FaUser color="rgba(255,255,255,0.7)" />
            </span>
            <span>{userDetails.name}</span>
          </div>
          {/* Email */}
          <div className="flex gap-1 items-center text-xl drop-shadow-md">
            <span className="rounded-full bg-blue-900 p-1 mr-2">
              {/* <FiMail color="white" /> */}
              <IoIosMail fontSize="30px" color="rgba(255,255,255,0.7)" />
            </span>
            {userDetails.email}
          </div>
          {/* PHONE NUMBER */}
          <div className="flex items-center gap-1 text-xl drop-shadow-md">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <FaPhoneAlt fontSize="22px" color="rgba(255,255,255,0.7)" />
            </span>
            <span>{userDetails.phone_number}</span>
          </div>

          {/* NUMBER OF REPORTS */}
          <div className="text-xl tracking-wider drop-shadow-md">
            <span>No of Reports: {userDetails.no_reports}</span>
          </div>

          {/* COINS */}
          <p className="flex items-center gap-1 drop-shadow-sm text-xl text-[#c39105d5]">
            <RiCoinsLine fontSize="34px" />
            <span className="tracking-wider">Coins: {userDetails.coins}</span>
          </p>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-3">
          <button className="px-8 py-4 text-white bg-gradient-to-b from-green-300 to-green-800  rounded-full drop-shadow-md shadow-buttonShadow tracking-wider text-lg">
            <Link to="/view-reports">My Reports</Link>
          </button>
          <button className="px-8 py-4 bg-gradient-to-b from-green-300 to-green-800 rounded-full drop-shadow-md shadow-buttonShadow tracking-wider text-white text-lg">
            <Link to="/logout">Logout</Link>
          </button>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default UserPage;
