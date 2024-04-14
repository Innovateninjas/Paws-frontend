import React, { useEffect, useState, useContext } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Loader from "../../Components/loaders/loader";
import { Link } from "react-router-dom";
import { NgoContext } from "../../contexts/NgoContext";
import { IoIosMail } from "react-icons/io";
import Button from "..//..//Components/tailwindButton/Button"

const NgoProfile = () => {
  const [userDetails, setUserData] = useState(null);
  const { NgoData, loading, error } = useContext(NgoContext);
  const [animals_supported, setAnimal] = useState();
  useEffect(() => {
    if (!loading && !error && NgoData) {
      setUserData(NgoData);
      setAnimal(NgoData.animals_supported);
    }
  }, [NgoData, loading, error]);
  if (error) {
    return <h1>{error}</h1>;
  }
  if (loading) {
    return <Loader visible />;
  }
  if (userDetails) {
    return (
      <>
        <div className="flex flex-col font-Calistoga items-center justify-center gap-[30px] h-screen bg-gradient-to-b from-[#7DFFA1] to-[#4B77E9] text-[#021E4E] p-4">
          <div className=" border-1 flex flex-col gap-[15px] rounded-[30px]  ring-1 ring-gray-300 bg-opacity-35 bg-white shadow-dashBoardCardImageShadow backdrop-blur-[5px]">
            <div className="flex px-4 pt-5 gap-5 items-center">
              <span className="w-fit h-fit rounded-full flex items-center bg-blue-900 p-4 mr-2">
                <FaUser color="rgba(255,255,255,0.7)" fontSize="60px" />
              </span>
              <p className="text-[30px] break-words">{userDetails.name}</p>
            </div>
            <div className="flex flex-col gap-2">
              {/* CONTACT DETAILS */}
              <div className=" px-4 py-2 flex border-t border-[#2e1ee49c] w-full flex-col gap-2">
                <p className="text-xl tracking-wider drop-shadow-md">
                  Contact Details:
                </p>
                {/* EMAIL */}
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
                {/* EMERGENCY NUMBER */}
                {/* <div className="flex items-center gap-1 text-xl drop-shadow-md">
                <span className="rounded-full bg-blue-900 p-2 mr-2">
                  <FaPhoneAlt fontSize="22px" color="rgba(255,255,255,0.7)" />
                </span>
                <span>{userDetails.emergency_contact_number}</span>
              </div> */}
              </div>
              {/* NUMBER OF REPORTS */}
              <div className="px-4 py-2 w-full flex border-t border-blue-800 items-center gap-1 text-[18px] drop-shadow-md">
                <p className="tracking-wider">Reports Received :</p>
                <span>{userDetails.no_received_reports}</span>
              </div>
              {/*DATE JOINED*/}
              <div className="px-4 py-2 flex border-t border-blue-800 items-center gap-1 text-[18px] drop-shadow-md">
                <p className="tracking-wider">Date Joined :</p>
                <span>
                  {
                    (new Date(userDetails.date_joined)).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }) 
                  }
                </span>
              </div>
              {/* WEBSITE URL */}
              <div className="px-4 py-2 flex flex-wrap border-t border-blue-800 items-center gap-1 text-[18px] drop-shadow-md">
                <p className="tracking-wider">Website URL :</p>
                <span>{userDetails.website}</span>
              </div>
              {/* ANIMALS SUPPORTED */}
              <div className="px-5 py-2 pb-5 flex border-t border-blue-800 items-center gap-1 text-[18px] drop-shadow-md">
              <p className="tracking-wider">Animal Supported:</p>
                {animals_supported &&
                  animals_supported.map((element, index) => (
                    <span key={index}>
                      {element}
                      {index !== animals_supported.length - 1 && ","}
                    </span>))}
              </div>
            </div>
          </div>
          <div className="">
          <Button
            clas="px-8 py-4 text-white "
            text={<Link to="/logout" className="tracking-widest">
                Logout
              </Link>}
          />
          </div>
        </div>
      </>
    );
  }
};

export default NgoProfile;
