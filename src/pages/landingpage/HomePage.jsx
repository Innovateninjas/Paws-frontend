import React, { useEffect, useState } from "react";
import Button from '../../Components/buttons/bigButton';
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

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
            {/* <ProfileIcon 
                top="-18%"
                left="44%"
            /> */}
            <div className={styles.container}>
            <img src="./images/logo.jpg" alt=""></img>
            <p className={styles.main_text}>
          "Save lives – report injured animals to authorities. Click below to notify and make a difference."
            </p>
            </div>
            <Link to="/report-incident">
                <Button text="Report" />
            </Link>
        </div>
    );
}
//   "Your help can save lives. If you come across wounded or distressed animals, report it to the authorities effortlessly. Be part of the solution for swift assistance and contribute to their timely rescue and care. Click below to notify the relevant authorities about injured wildlife and make a difference."

export default LandingPage;
