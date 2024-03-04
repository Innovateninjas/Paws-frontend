import React, { useEffect, useState, useContext } from "react";
import {FiMail } from "react-icons/fi";
import ProfileIcon from "../../Components/ProfileComponent/ProfileIcon";
import styles from "./ngoProfile.module.css";
import Loader from "../../Components/loader/loader";
// import { Link } from "react-router-dom";
import { NgoContext } from "../../contexts/NgoContext";

const NgoProfile = () => {
  const [userDetails, setUserData] = useState(null);
  const { NgoData, loading, error } = useContext(NgoContext);
  const [animals_supported, setAnimal] = useState();
  useEffect(() => {
    console.log(NgoData);
    if (!loading && !error && NgoData) {
      setUserData(NgoData);
      setAnimal(NgoData.animals_supported);
    }
  }, [NgoData, loading, error]);
  if (error) {
    return <h1>{error}</h1>;
  }
  console.log(userDetails);
  if (loading) {
    return <Loader visible />;
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
      <b> Number of Reports:</b>
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

      </>
    );
  }
};

export default NgoProfile;
