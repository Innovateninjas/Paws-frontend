import React, { useContext, useEffect, useState } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { UserContext } from "../../../contexts/UserContext";
import styles from "./ContactInformationPage.module.css"
import InputField from "../../../Components/InputsFields/bigInputs";
import { Watch } from "react-loader-spinner";

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
    <div className={styles.main}>
      {userLoading && ( // Render loading spinner while user data is loading
        <div className={styles.spinners_wrap}>
          <h2 style={{ fontFamily: "cursive", fontSize: "2rem" }}>Loading...</h2>
          <Watch
            visible={true}
            height={80}
            width={80}
            radius={40}
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperClass={styles.spinner}
          />
        </div>
      )}

      <div className={styles.wrap}>
        <h1 className={styles.heading}>Contact Details</h1>
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
        <p className={styles.para} onClick={() => setModalIsOpen(true)}>Learn why we need that data</p>
        <div className={styles.buttons}>
          <button
            className={styles.customButton}
          >
            Back
          </button>
          <button
            className={styles.customButton}
            onClick={(e) => {
              if (validatePage()) {
                handleNextPage();
                handleSubmit(e);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <Rodal visible={modalIsOpen} animation="zoom" showCloseButton closeMaskOnClick onClose={() => { setModalIsOpen(false) }} closeOnEsc className={styles.modal} width={350}>
        <p className={styles.modalText}>Your name, email, and phone number are essential for us to contact you and coordinate the rescue process effectively. Providing accurate information will help us rescue animals promptly and ensure their safety and well-being. Thank you for your cooperation.</p>
      </Rodal>
    </div>
  );
}

export default ContactInformationPage;
