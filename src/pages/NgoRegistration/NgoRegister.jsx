import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NgoRegister.module.css";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/InputsFields/bigInputs";
import ReactiveButton from "reactive-button";
import Dropdown from "../../Components/dropDown/select";
import {
  login,
  registration,
} from "../../Components/utils/Functions/authService";
// import { shadow } from "@cloudinary/url-gen/actions/effect";
function NgoRegisterForm() {
  const location = useLocation();

  var isLogin = true;
  if (location.pathname === "/ngoregister") {
    isLogin = !isLogin;
  }
  const customButtonStyle = {
    borderRadius: "14px",
    background: "#333333",
    boxShadow: "2px 2px 2px black",
    padding: "10px 85px",
    marginTop: "0.675rem",
    fontSize: "19px",
    fontWeight: "700",
  };

  const [orgName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emergency, setEmergency] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");
  const [lcation, setLocation] = useState("");
  const [websiteLink, setWebsite] = useState("");
// GETLOCATION 
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`latitude: ${latitude}, longitude: ${longitude}`); // Add this line

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setLocation(address);
          console.log("Address:", address);
        } else {
          console.log("No results found");
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getUserLocation();
  }, []);
// WEBSITE LINK VALICATION
  const handleChange = (e) => {
    const { value } = e.target;
    setWebsite(value);

    const regex =
      /^(?:(?:https?):\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/\S*)?$/;
    const isValid = regex.test(value);

    if (!isValid) {
      setError("Invalid website link");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.container}>
      <img src="./images/paw.png" alt="paw img" className={styles.paw1} />
      <form className={styles.ngoForm}>
        {!isLogin && (
          <>
            <h1>Join Us Today</h1>
            {/* NAME */}
            <InputField
              type="text"
              placeholder="Enter Your NGO's Name"
              value={orgName}
              onChange={(e) => {
                setError("");
                setFullName(e.target.value);
              }}
              required
            />
            {/* PHONE NUMBER */}
            <InputField
              type="number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                setError("");
                setPhoneNumber(e.target.value);
              }}
              required
            />
            {/* EMAIL */}
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              required
            />
            {/* PASSWORD */}
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              required
            />
            {/* LOCATION */}

            <InputField
              type="text"
              placeholder="Address"
              value={lcation}
              onChange={(e) => {
                setError("");
                setLocation(e.target.value);
              }}
            />

            <Dropdown />
            {/* EMERGENCY CONTACT NUMBER */}
            <InputField
              type="number"
              placeholder="Emergency Contact Number"
              value={emergency}
              onChange={(e) => {
                setError("");
                setEmergency(e.target.value);
              }}
            />
            {/* WEBSITE LINK  */}
            <InputField
              type="text"
              placeholder="Website Link"
              value={websiteLink}
              onChange={handleChange}
            />
          </>
        )}
        {/* REGISTER BUTTON */}
        {!isLogin && (
          <>
            <div className={styles.btn}>
              <ReactiveButton
                style={customButtonStyle}
                buttonState={state}
                idleText="Register"
                loadingText="wait.."
                successText="Logging In"
                errorText="Register"
                messageDuration={3000}
                onClick={async () => {
                  registration(
                    orgName,
                    phoneNumber,
                    email,
                    password,
                    setError,
                    setButtonState
                  );
                  //   console.log("BAKA");
                }}
              />
            </div>
          </>
        )}

        {!isLogin && (
          <p className={styles.text}>
            Already have an account?
            <Link to="/login" className={styles.LoginNow}>
              Login now!
            </Link>
          </p>
        )}
        {/* {isLogin && <h1 className={styles.heading}> Welcome Back</h1>} */}
      </form>
      {error && <p className={styles.errtext}>{error}</p>}
      <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
    </div>
  );
}

export default NgoRegisterForm;
