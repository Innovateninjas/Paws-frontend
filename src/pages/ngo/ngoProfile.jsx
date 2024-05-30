import React, { useEffect, useState, useContext } from "react";
// import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Loader from "../../Components/shared/loader";
import { Link } from "react-router-dom";
import { NgoContext } from "../../utils/contexts/NgoContext";
import { IoIosMail } from "react-icons/io";
import Button from "../../Components/shared/Button"
import { ProfilePhoto } from "../../Components/shared/ProfilePhoto";

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
        <div className="flex flex-col font-Calistoga items-center justify-center gap-[30px] min-h-screen bg-custom-gradient p-4 pb-[70px]">
          <div className="w-full md:w-[80%] mt-8 break-normal border-1 flex flex-col gap-[15px] rounded-[30px] bg-opacity-35 bg-white shadow-dashBoardCardImageShadow backdrop-blur-[5px] break-word">
            <div className="flex px-4 md:px-5 pt-5 gap-5 items-center">
              <ProfilePhoto userDetails={userDetails} setUserData={setUserData} />
              <p className="text-[30px] break-words">{userDetails.name}</p>
            </div>
            <div className="flex flex-col gap-2">
              {/* CONTACT DETAILS */}
              <div className=" px-5 py-2 flex border-t border-[#2e1ee49c] w-full flex-col gap-2">
                <p className="text-xl tracking-wider drop-shadow-md">
                  Contact Details:
                </p>
                {/* EMAIL */}
                <div className="flex max-w-full break-words gap-1 items-center text-xl drop-shadow-md">
                  <span className="rounded-full bg-blue-900 p-1 mr-2">
                    <IoIosMail fontSize="30px" color="rgba(255,255,255,0.7)" />
                  </span>
                  <span className="max-w-[85%]">
                    {userDetails.email}
                  </span>

                </div>
                {/* PHONE NUMBER */}
                <div className="flex items-center gap-1 text-xl drop-shadow-md">
                  <span className="rounded-full bg-blue-900 p-2 mr-2">
                    <FaPhoneAlt fontSize="22px" color="rgba(255,255,255,0.7)" />
                  </span>
                  <span className="max-w-[85%]">{userDetails.phone_number}</span>
                </div>
              </div>
              {/* NUMBER OF REPORTS */}
              <div className="px-5 py-2 flex border-t border-blue-800 items-center gap-1 text-[18px] drop-shadow-md">
                <p className="tracking-wider">Reports Received :</p>
                <span className="max-w-[60%] break-words">{userDetails.no_received_reports}</span>
              </div>
              {/*DATE JOINED*/}
              <div className="px-5 py-2 flex border-t border-blue-800 items-center gap-1 text-[18px] drop-shadow-md">
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
              <div className="px-5 py-2 flex border-t border-blue-800  gap-1 text-[18px] drop-shadow-md">
                <p className="tracking-wider">Unique Darpan Id :</p>
                <span className="max-w-[80%] ml-1 break-words">{userDetails.website} </span>
              </div>
              {/* ANIMALS SUPPORTED */}
              <div className="px-5 py-2 pb-3 flex border-t border-blue-800 gap-1 text-[18px] drop-shadow-md">
                <p className="tracking-wider">Animal Supported:</p>
                <span className="ml-1 max-w-[80%] break-words flex flex-wrap" >
                  {animals_supported &&
                    animals_supported.map((element, index) => (
                      <p className="mr-1" key={index}>{element}
                        {index !== animals_supported.length - 1 && ","}</p>
                    ))}

                </span>
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
