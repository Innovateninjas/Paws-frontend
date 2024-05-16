import React, { useEffect, useState, useContext } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiCoinsLine } from "react-icons/ri";
import { IoDocumentSharp } from "react-icons/io5";
import Loader from "../../Components/shared/loader";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/contexts/UserContext";
import { ProfilePhoto } from "../../Components/shared/ProfilePhoto";
function UserPage() {
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext);

  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <Loader visible />;
  }

  if (userDetails) {
    return (
      <div className="flex flex-col font-Calistoga items-center justify-center gap-[30px] h-screen bg-custom-gradient">
        <ProfilePhoto userDetails={userDetails} setUserData={setUserData}/>

        <div className=" min-w-80 p-5 border-1 flex flex-col gap-[15px] rounded-[30px]  ring-1 ring-gray-300 bg-opacity-35 bg-white shadow-dashBoardCardImageShadow backdrop-blur-[5px]">
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
          <div className="flex items-center gap-1 text-xl drop-shadow-md">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <IoDocumentSharp fontSize="24px" color="rgba(255,255,255,0.7)"/>
              {/* <FaPhoneAlt fontSize="22px" color="rgba(255,255,255,0.7)" /> */}
            </span>

            <span>Reports: {userDetails.no_reports}</span>
          </div>

          {/* COINS */}
          <p className="flex items-center gap-1 drop-shadow-sm text-xl">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <RiCoinsLine fontSize="28px" color="rgba(255,255,255,0.7)" />
            </span>
            <span className="tracking-wider">Coins: {userDetails.coins}</span>
          </p>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-3">
          <button className="px-6 py-5 text-white bg-gradient-to-b from-green-600 to-green-700  rounded-[35px] drop-shadow-md shadow-buttonShadow text-[1.3rem] leading-[1.3rem] tracking-widest">
            <Link to="/view-reports">My Reports</Link>
          </button>
          <button className="px-6 py-5 text-white bg-gradient-to-b from-green-600 to-green-700  rounded-[35px] drop-shadow-md shadow-buttonShadow text-[1.3rem] leading-[1.3rem] tracking-widest">
            <Link to="/logout">Logout</Link>
          </button>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default UserPage;
