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
  <div className="h-screen w-screen">
    <Background />
    <div className="flex flex-col justify-center items-center relative">
      <div className="mt-24 relative w-full h-full flex flex-col items-center">
        <h1 className="font-baijam text-2xl font-black mb-5 text-purple-950 drop-shadow-md">CONTACT DETAILS</h1>
        <div className="bg-white">
        <label>
          Name:
          <InputField
            type="text"
            name="user_name"
            placeholder="Name"
            value={formData.user_name}
            onChange={handleChange}
            required={true}
            backgroundColor={"#D9D9D9"}
            outline={true}
          />
          <div className="error">{errors.first_name}</div>
        </label>
        <br />
        <label>
          Phone Number:
          <InputField
            type="tel"
            name="user_phone"
            placeholder="Phone Number"
            value={formData.user_phone}
            onChange={handleChange}
            required={true}
            backgroundColor={"#D9D9D9"}
            outline={true}
          />
          <div className="error">{errors.last_name}</div>
        </label>
        <br />
        <label>
          Email:
          <InputField
            type="email"
            name="user_email"
            placeholder="Email"
            value={formData.user_email}
            onChange={handleChange}
            required={true}
            backgroundColor={"#D9D9D9"}
            outline={true}
          />
          <div className="error">{errors.username}</div>
        </label>
        <br />
        </div>
        <p className="text-breeSerif font-medium text-center w-9/10 mx-auto text-blue-900 cursor-pointer underline" onClick={() => setModalIsOpen(true)}>Learn why we need that data</p>
        <div className="flex justify-between w-full">
          <Button text="Back" clas="bg-blue-900 text-white" onClick={() => {console.log('Clicked on Back');}}/>
          <Button text="Submit" clas="bg-blue-900 text-white" onClick={(e) => {
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