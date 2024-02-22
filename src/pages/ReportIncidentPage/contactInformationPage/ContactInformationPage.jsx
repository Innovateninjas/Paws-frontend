import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import checkLoginStatus from "../../../Components/utils/Functions/isLoggedIn";
import styles from "./ContactInformationPage.module.css"
import InputField from "../../../Components/InputsFields/bigInputs"
import { Watch } from "react-loader-spinner";

const isLoggedIn = checkLoginStatus();
function ContactInformationPage({
  formData,
  setFormData,
  errors,
  handleChange,
  handleSubmit,
  validatePage,
  handleNextPage,
}) {
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const csrftoken = localStorage.getItem("csrftoken");
      const response = await axios.get(
        "https://aniresfr-backend.vercel.app/user",
        {
          headers: {
            Authorization: `Token ${csrftoken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        setLoaded(true);
        return userData;
      } else {
        console.error("Error fetching user information");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const userData = await fetchUserData();
        setFormData((prevData) => ({
          ...prevData,
          user_name: userData.first_name,
          user_phone: userData.last_name,
          user_email: userData.username,
        }));
      }
    };

    fetchData();
  }, [fetchUserData, setFormData]);

  // Update input values when formData changes


  return (
    <div className={styles.main}>
      {isLoggedIn && !loaded && ( // Render only when isLoggedIn is true and loaded is false
        <div className={styles.spinners_wrap}>
          <h2 style={
            { fontFamily: "cursive",
            fontSize: "2rem",
             }
          } >Loading...</h2>
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
        {/* Allow the user to fill in details manually if not logged in */}
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
                handleNextPage(); // Call the handleNextPage function
                handleSubmit(e);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <Rodal visible={modalIsOpen} animation="zoom" showCloseButton closeMaskOnClick onClose={() => { setModalIsOpen(false) }} closeOnEsc className={styles.modal} width={350}	>
        <p className={styles.modalText}>Your name, email, and phone number are essential for us to contact you and coordinate the rescue process effectively. Providing accurate information will help us rescue animals promptly and ensure their safety and well-being. Thank you for your cooperation.</p>
      </Rodal>
    </div>
  );
}

export default ContactInformationPage;
