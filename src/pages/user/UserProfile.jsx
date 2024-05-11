import React, { useEffect, useState, useContext, useRef } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiCoinsLine } from "react-icons/ri";
import { IoDocumentSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import isValidPhoneNumber from "../../utils/Functions/phoneNumberValidator";
import Loader from "../../Components/shared/loader";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/contexts/UserContext";
import { HiMiniUser } from "react-icons/hi2";
function UserPage() {
  // const mockData = {
  //   name: "siva",
  //   email: "siva.torres@gmail.com",
  //   phone_number: 8484848499,
  //   no_reports: 5,
  //   coins: 4,
  // };
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext);
  const [edit, setEdit] = useState(null);
  const [errorMsgForName, setErrorMsgForName] = useState(null);
  const [errorMsgForPhoneNumber, setaErrorMsgForPhoneNumber] = useState(null);

  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);

  console.log(nameRef);
  console.log(userDetails?.phone_number);

  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);

  const updateUserData = (name, value) => {
    setUserData((prev) => {
      let updatedUserData = {
        ...prev,
        [name]: [value],
      };
      console.log(updatedUserData);
      return updatedUserData;
    });
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <Loader visible />;
  }

  if (userDetails) {
    return (
      <div className="flex flex-col font-Calistoga items-center justify-center gap-[30px] h-screen bg-custom-gradient">
        <div className="p-5 rounded-[50%] bg-blue-900 shadow- dashBoardCardImageShadow flex items-end justify-center ">
          {/* <img className="" src="./images/profileIcon.png" alt="icon" /> */}
          <HiMiniUser fontSize="9rem" color="rgba(255,255,255,0.8)" />
        </div>
        <div className=" min-w-80 p-5 border-1 flex flex-col gap-[15px] rounded-[30px]  ring-1 ring-gray-300 bg-opacity-35 bg-white shadow-dashBoardCardImageShadow backdrop-blur-[5px]">
          {/* NAME */}
          <div className="flex gap-1 items-center text-xl drop-shadow-md relative">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <FaUser color="rgba(255,255,255,0.7)" />
            </span>
            {edit !== "name" && <span>{userDetails?.name}</span>}
            {edit === "name" && (
              <>
                <div className="flex justify-center items-center absolute left-12 gap-1">
                  <input
                    ref={nameRef}
                    defaultValue={userDetails?.name}
                    type="text"
                    className="max-w-[170px] p-2 rounded outline-none"
                  />
                  <button
                    className="bg-blue-600 rounded text-white p-2"
                    onClick={() => {
                      if (nameRef?.current?.value?.trim().length >= 3) {
                        updateUserData("name", nameRef?.current?.value);
                        setEdit(null);
                        setErrorMsgForName(null);
                      } else {
                        setErrorMsgForName(
                          "Name should be atleast 3 characters"
                        );
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-200 rounded text-black p-2"
                    onClick={() => setEdit(null)}
                  >
                    Cancel
                  </button>
                  {errorMsgForName !== null && (
                    <div className="text-red-600 text-base ml-6 min-w-[280px] flex items-center">
                      <span>
                        <MdErrorOutline className="text-2xl mr-2" />
                      </span>
                      {errorMsgForName}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="w-full flex justify-end text-right cursor-pointer text-base text-gray-900 hover:text-blue-900">
              <div
                onClick={() => {
                  setEdit("name");
                  setTimeout(() => {
                    nameRef?.current?.focus();
                  }, 0);
                }}
              >
                <FaPencil />
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="flex gap-1 items-center text-xl drop-shadow-md">
            <span className="rounded-full bg-blue-900 p-1 mr-2">
              <IoIosMail fontSize="30px" color="rgba(255,255,255,0.7)" />
            </span>
            {userDetails?.email}
          </div>
          {/* PHONE NUMBER */}
          <div className="flex items-center gap-1 text-xl drop-shadow-md relative">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <FaPhoneAlt fontSize="22px" color="rgba(255,255,255,0.7)" />
            </span>
            {edit !== "phoneNumber" && <span>{userDetails?.phone_number}</span>}
            {edit === "phoneNumber" && (
              <>
                <div className="flex justify-center items-center absolute left-12 gap-1">
                  <input
                    ref={phoneNumberRef}
                    defaultValue={userDetails?.phone_number}
                    type="text"
                    className="max-w-[170px] p-2 rounded outline-none"
                  />
                  <button
                    className="bg-blue-600 rounded text-white p-2"
                    onClick={() => {
                      if (isValidPhoneNumber(phoneNumberRef?.current?.value)) {
                        updateUserData(
                          "phone_number",
                          phoneNumberRef?.current.value
                        );
                        setEdit(null);
                        setaErrorMsgForPhoneNumber(null);
                      } else {
                        setaErrorMsgForPhoneNumber("Phone number is invalid");
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-200 rounded text-black p-2"
                    onClick={() => setEdit(null)}
                  >
                    Cancel
                  </button>
                  {errorMsgForPhoneNumber !== null && (
                    <div className="text-red-600 text-base ml-6 min-w-[280px] flex items-center">
                      <span>
                        <MdErrorOutline className="text-2xl mr-2" />
                      </span>
                      {errorMsgForPhoneNumber}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="w-full flex justify-end text-right cursor-pointer text-base text-gray-900 hover:text-blue-900">
              <div>
                <FaPencil
                  onClick={() => {
                    setEdit("phoneNumber");
                    setTimeout(() => {
                      phoneNumberRef?.current?.focus();
                    }, 0);
                  }}
                />
              </div>
            </div>
          </div>

          {/* NUMBER OF REPORTS */}
          <div className="flex items-center gap-1 text-xl drop-shadow-md">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <IoDocumentSharp fontSize="24px" color="rgba(255,255,255,0.7)" />
              {/* <FaPhoneAlt fontSize="22px" color="rgba(255,255,255,0.7)" /> */}
            </span>

            <span>Reports: {userDetails?.no_reports}</span>
          </div>

          {/* COINS */}
          <p className="flex items-center gap-1 drop-shadow-sm text-xl">
            <span className="rounded-full bg-blue-900 p-2 mr-2">
              <RiCoinsLine fontSize="28px" color="rgba(255,255,255,0.7)" />
            </span>
            <span className="tracking-wider">Coins: {userDetails?.coins}</span>
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
