import React, { useEffect, useState, useContext } from "react";
import {FiMail } from "react-icons/fi";
import ProfileIcon from "../../Components/ProfileComponent/ProfileIcon";
import styles from "./ngoProfile.module.css";
import { Link } from "react-router-dom";
import { NgoContext } from "../../contexts/NgoContext";

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

  if (loading) {
    return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center text-center w-full h-full">
        <div role="status">
            <svg aria-hidden="true" class="inline w-48 h-48 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  if (userDetails) {
    return (
      <>
        <div className={styles.container}>
  <div className={styles.profile}>
    <ProfileIcon top={"35px"} left={"50px"}></ProfileIcon>
    <p className={styles.username}><b>{userDetails.name}</b></p>
  </div>
  <div className={styles.details}>
    <p className={styles.text}><b>Contact Details:</b></p>
    <li>
      <span>
        <b><FiMail /></b> {userDetails.email}
      </span>
    </li>
    <li>
      <b>Phone Number:</b>
      <span> {userDetails.phone_number}</span>
    </li>
    <li>
      <b>Emergency Number:</b>
      <span> {userDetails.emergency_contact_number}</span>
    </li>
    <p className={styles.text}>
      <b> Reports Recived:</b>
      <span>{userDetails.no_received_reports}</span>
    </p>
    <p className={styles.text}>
      <b>Date Joined:</b>
      <span> {userDetails.date_joined.split("T")[0]}</span>
    </p>
    <p className={styles.text}>
      <b>Website URL:</b>
      <span>{userDetails.website}</span>
    </p>
    <p className={styles.text}>
      <b>Animal Supported:</b>
      {animals_supported && animals_supported.map((element, index) => (
  <span key={index}>
    {element}
    {index !== animals_supported.length - 1 && ','}
  </span>
))}
    </p>
  </div>
</div>
<div className={styles.btnContainer}>
<button className={styles.button}>
    <Link to="/logout" className={styles.link}> Logout</Link>
    </button>
    </div>
      </>
    );
  }
};

export default NgoProfile;
