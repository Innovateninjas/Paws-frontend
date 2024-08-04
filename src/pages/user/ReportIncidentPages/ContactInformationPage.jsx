import React, { useContext, useEffect, useState } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { UserContext } from "../../../utils/contexts/UserContext";
import InputField from "../../../Components/shared/InputField";
import Background from "../../../Components/shared/Background";
import Button from "../../../Components/shared/Button";


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
    <div className=" flex flex-col justify-center md:h-[100%] items-center relative ">
      <div className="my-10 xs:py-8 relative  w-full  gap-[20px] flex flex-col items-center ">
        <h1 className="text-center mt-[20px]  xs:text-[25px] pb-1 z-[3] text-[#0B0553DE] font-black tracking-wide text-[2rem] underline">CONTACT DETAILS</h1>
     <div className="bg-gray-200 bg-opacity-20 w-[90%] md:w-[75%]C py-8 px-4 rounded-3xl backdrop-blur-[6px] flex flex-col justify-evenly items-center gap-[10px] shadow-dashBoardCardImageShadow">
   <div className="flex flex-col gap-[7px]">
        
          <InputField
           className=" h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] md:w-[250px] xs:w-[200px] xs:h-12 px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg xs:text-[16px] placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
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
         className=" h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] md:w-[250px] xs:w-[200px] xs:h-12  px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg xs:text-[16px] placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
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
            className=" h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] md:w-[250px] xs:w-[200px] xs:h-12 px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg xs:text-[16px] placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
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
        <p className="text-breeSerif xs:text-[16px] font-medium text-center w-9/10 mx-auto text-violet-900 cursor-pointer underline text-[18px]" onClick={() => setModalIsOpen(true)}>Learn why we need that data</p>
         <div className="flex justify-evenly sm:justify-center gap-5 items-center w-full">
          <Button text="Back" clas="tracking-wider  md:text-[23px] md:px-7 xs:text-[20px] xs:px-7  px-16 text-white focus:outline-none" onClick={handleBackPage}/>
          <Button text="Submit" clas="tracking-wider md:text-[23px] md:px-5 xs:text-[20px] xs:px-5 px-14 text-white bg-gradient-to-b from-blue-600 to-blue-800 shadow-buttonShadow focus:outline-none" onClick={(e) => {
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
        width={300} height={290} >
          <div className="font-breeSerif text-[17px] pt-3 px-2 flex flex-col space-y-4   text-justify">
        <p className="">Your name, email, and phone number are essential for us to contact you and coordinate the rescue process effectively.</p>
        <p> Providing accurate information will help us rescue animals promptly and ensure their safety and well-being. Thank you for your cooperation.</p>
        </div>
      
      </Rodal>
    </div>
  </div>
  );
}

export default ContactInformationPage;
