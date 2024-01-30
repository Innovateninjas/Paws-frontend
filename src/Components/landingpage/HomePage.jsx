import React, { useEffect, useState } from "react";
import Button from '../buttons/bigButton';
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import ProfileIcon from "../ProfileComponent/ProfileIcon";

function LandingPage() {
    // const [userLocation, setUserLocation] = useState(null);

    // useEffect(() => {
    //   // Get the user's current location using the browser's geolocation API
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    //       setUserLocation({ latitude, longitude });
    //     },
    //     (error) => {
    //       console.error('Error getting user location:', error);
    //     }
    //   );
    // }, []); // Run this effect only once on component mount

    return (
        <div className={styles.main}>
            <ProfileIcon 
                top="-18%"
                left="44%"
            />
            <img
                className={styles.imgTop}
                src="./images/homepagetop.png"
                alt="alt_text"
            />
            <p className={styles.main_text}>
                Your help can save a life. Report any wounded or distress
                animals directly to the authorities with ease. Be a part of the
                solution and ensure swift assistance for animals in need. Click
                below to notify the relevant authorities about injured wildlife
                and contribute to their timely rescue and care
            </p>
            <Link to="/report-incident">
                <Button text="Report to Authority" />
            </Link>
        </div>
    );
}

export default LandingPage;
