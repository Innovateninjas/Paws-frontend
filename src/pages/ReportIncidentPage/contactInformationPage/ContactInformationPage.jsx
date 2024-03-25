import React, { useContext, useEffect, useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { UserContext } from "../../../contexts/UserContext";
import InputField from "../../../Components/InputsFields/bigInputs";
import Background from "../../../Components/backgroundComponent/Background";
import Button from "../../../Components/tailwindButton/Button";

function ContactInformationPage({
  formData,
  setFormData,
  errors,
  handleChange,
  handleSubmit,
  validatePage,
  handleNextPage,
}) {
  const { userData, loading: userLoading } = useContext(UserContext); //renaming the loading property to userLoading
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      // Update formData with userData if available
      setFormData((prevData) => ({
        ...prevData,
        user_name: userData.name,
        user_phone: userData.phone_number,
        user_email: userData.email,
      }));
    }
  }, [userData, setFormData]);

  return (
    <div className="h-screen w-screen font-breeSerif">
      <Background />
      <div className=" flex flex-col justify-center items-center relative">
        <div className="mt-24 relative w-full gap-[20px] flex flex-col items-center ">
          <h1 className="text-center mt-[20px] pb-1 z-[3] text-[#0B0553DE] font-black tracking-wide text-[1.6em] underline">
            CONTACT DETAILS
          </h1>
          <div className="bg-[#FFFFFF] w-[90%] p-5 rounded-3xl bg-opacity-50 backdrop-blur-[6px] flex flex-col justify-evenly shadow-dashBoardCardImageShadow">
            <div className="flex flex-col gap-[10px]">
              <label className="font-extrabold text-[#0B0553DE] pl-3 text-xl">
                Name :
              </label>
              <InputField
                className=" h-[60px] rounded-[30px] shadow-dashBoardCardImageShadow p-4 w-[100%] outline-0 bg-opacity-80 bg-gradient-to-b from-gray-200 to-[#00C732]"
                type="text"
                name="user_name"
                // placeholder="Name"
                value={formData.user_name}
                onChange={handleChange}
                required={true}
                backgroundColor={"#D9D9D9"}
                outline={true}
              />
              <div className="error">{errors.first_name}</div>
            </div>
            <br />
            <div className="flex flex-col gap-[10px]">
              <label className="font-extrabold text-[#0B0553DE] pl-3 text-xl">
                Phone Number:
              </label>
              <InputField
                className=" h-[60px] rounded-[30px] shadow-dashBoardCardImageShadow p-4 w-[100%] outline-0 bg-opacity-80  bg-gradient-to-b from-gray-200 to-[#A15ECF] "
                type="tel"
                name="user_phone"
                // placeholder="Phone Number"
                value={formData.user_phone}
                onChange={handleChange}
                required={true}
                outline={true}
              />
              <div className="error">{errors.last_name}</div>
            </div>
            <br />
            <div className="flex flex-col gap-[10px]">
              <label className="font-extrabold text-[#0B0553DE] pl-3 text-xl">
                Email:{" "}
              </label>
              <InputField
                className=" h-[60px] rounded-[30px]  p-4 w-[100%] outline-0 bg-opacity-80 bg-gradient-to-b from-gray-200 to-[#428DDB] shadow-dashBoardCardImageShadow"
                type="email"
                name="user_email"
                // placeholder="Email" placeholder-black
                value={formData.user_email}
                onChange={handleChange}
                required={true}
              />
              <div className="error">{errors.username}</div>
            </div>
          </div>
          <p
            className="text-breeSerif font-medium text-center w-9/10 mx-auto text-blue-900 cursor-pointer underline"
            onClick={() => setModalIsOpen(true)}
          >
            Learn why we need that data
          </p>
          <div className="flex justify-evenly  w-full">
            <Button
              text="Back"
              clas="tracking-widest shadow-dashBoardCardImageShadow bg-slate-300"
              onClick={() => {
                console.log("Clicked on Back");
              }}
            />
            <Button
              text="Submit"
              clas="shadow-dashBoardCardImageShadow tracking-widest bg-gradient-to-b from-slate-300 to-[#7048F2] bg-opacity-30 text-baloo"
              onClick={(e) => {
                if (validatePage()) {
                  handleNextPage();
                  handleSubmit(e);
                }
              }}
            />
          </div>
        </div>
        <Rodal
          visible={modalIsOpen}
          animation="zoom"
          showCloseButton
          closeMaskOnClick
          onClose={() => {
            setModalIsOpen(false);
          }}
          closeOnEsc
          className="bg-black bg-opacity-60 backdrop-blur-md"
          width={320}
          height={290}
        >
          <p className="font-breeSerif text-xl font-normal text-balance">
            Your name, email, and phone number are essential for us to contact
            you and coordinate the rescue process effectively. Providing
            accurate information will help us rescue animals promptly and ensure
            their safety and well-being. Thank you for your cooperation.
          </p>
        </Rodal>
      </div>
    </div>
  );
}

export default ContactInformationPage;
