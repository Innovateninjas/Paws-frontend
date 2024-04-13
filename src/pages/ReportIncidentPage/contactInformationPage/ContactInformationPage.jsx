import React, { useContext, useEffect, useState } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { UserContext } from "../../../contexts/UserContext";
import InputField from "../../../Components/InputsFields/bigInputs";
import Background from "../../../Components/backgroundComponent/Background";
import Button from "../../../Components/tailwindButton/Button";

function ContactInformationPage({
  formData,
  setFormData,
  errors,
  handleBackPage,
  handleChange,
  handleSubmit,
  validatePage,
  handleNextPage,
}) {
  const { userData} = useContext(UserContext);
  const csrftoken = localStorage.getItem('csrftoken');
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
      <div className="mt-24 relative w-full  gap-[20px] flex flex-col items-center ">
        <h1 className="text-center mt-[20px] pb-1 z-[3] text-[#0B0553DE] font-black tracking-wide text-[2rem] underline">CONTACT DETAILS</h1>
     <div className="bg-gray-200 bg-opacity-40 w-[90%] py-8 px-4 rounded-3xl backdrop-blur-[6px] flex flex-col justify-evenly gap-[10px] shadow-dashBoardCardImageShadow">
   <div className="flex flex-col gap-[10px]">

          <InputField
           className=" h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
            type="text"
            placeholder="Name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required={true}
            backgroundColor={"#D9D9D9"}
            outline={true}
          />
          <small className="text-sm text-red-500">{errors.user_name}</small>
          <div className="error">{errors.first_name}</div>
          </div>
        <div className="flex flex-col gap-[10px]">

          <InputField
         className=" h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
            type="tel"
            placeholder="Phone Number"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleChange}
            required={true}
            outline={true}
          />
          <small className="text-sm text-red-500">{errors.user_phone}</small>
          </div>
        <div className="flex flex-col gap-[10px]">

          <input
            className=" h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
            type="email"
            placeholder="E-mail"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required={true}
            disabled={csrftoken? true : false}
            />
          <small className="text-sm text-red-500">{errors.user_email}</small>
        </div>
        </div>
        <p className="text-breeSerif font-medium text-center w-9/10 mx-auto text-violet-900 cursor-pointer underline text-[18px]" onClick={() => setModalIsOpen(true)}>Learn why we need that data</p>
        <div className="flex justify-center gap-5 items-center w-full">
          <Button text="Back" clas="tracking-wider px-6 text-white focus:outline-none" onClick={handleBackPage}/>
          <Button text="Submit" clas="tracking-wider px-6 text-white bg-gradient-to-b from-blue-600 to-blue-800 shadow-buttonShadow focus:outline-none" onClick={(e) => {
            if (validatePage()) {
              handleNextPage();
              handleSubmit(e);
            }
          }}/>
        </div>
      </div>
      <Rodal visible={modalIsOpen} 
        animation="zoom" 
        showCloseButton 
        closeMaskOnClick 
        onClose={() => { setModalIsOpen(false) }} 
        closeOnEsc 
        className="bg-black bg-opacity-60 backdrop-blur-md" 
        width={320} height={290} >
        <p className="font-breeSerif text-xl font-normal text-balance">Your name, email, and phone number are essential for us to contact you and coordinate the rescue process effectively. Providing accurate information will help us rescue animals promptly and ensure their safety and well-being. Thank you for your cooperation.</p>
      </Rodal>
    </div>
  </div>
  );
}

export default ContactInformationPage;