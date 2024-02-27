import React, { useState, useEffect } from "react";
import styles from "./NgoRegister.module.css";
import InputField from "../../Components/InputsFields/bigInputs";
import ReactiveButton from "reactive-button";
// import Dropdown from "../../Components/dropDown/SimpleDropDown/select";
import Creatable from 'react-select/creatable';
import { registration } from "../../Components/utils/Functions/ngoAuthService";
import LoginTextLink from "../../Components/LoginLinkText/LoginTextLink";
import getUserLocation from "../../Components/utils/Functions/getLocationData";
import { AnimalList } from "./animalList";

// import { shadow } from "@cloudinary/url-gen/actions/effect";
function NgoRegisterForm() {

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
  const [animalSupported, setanimalSupported] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emergency, setEmergency] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");
  const [lcation, setLocation] = useState("");
  const [websiteLink, setWebsite] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    getUserLocation(setLatitude, setLongitude);
  }, []);

  return (
    <div className={styles.container}>
      <img src="./images/paw.png" alt="paw img" className={styles.paw1} />
      <form className={styles.ngoForm}>
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

          <Creatable
            styles={{
              control: base =>
              ({
                ...base,
                width: '300px',
                border: '1px solid #b6b5b5',
                height: '46px',
                borderRadius: '10px',
                padding: '10px 17px',
                marginTop: '0.675rem',
                fontSize: '19px',
                fontWeight: '700'
              })
            }
            }
            isMulti={true}
            placeholder="Animal Supported"
            options={AnimalList}
            onChange={(selectedOptions) => {
              const animalNames = selectedOptions.map(option => option.label);
              setError("");
              setanimalSupported(animalNames);
            }
            }
          />
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
            placeholder="Website Link(optional)"
            value={websiteLink}
            onChange={(e) => {
              setError("");
              setWebsite(e.target.value);
            }
            }
          />
        </>
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
                console.log(
                  orgName,
                  phoneNumber,
                  email,
                  emergency,
                  password,
                  animalSupported,
                  lcation,
                  websiteLink,
                  latitude,
                  longitude);
                registration(
                  orgName,
                  phoneNumber,
                  email,
                  emergency,
                  password,
                  animalSupported,
                  lcation,
                  websiteLink,
                  latitude,
                  longitude,
                  setError,
                  setButtonState
                );
                //   console.log("BAKA"); hai hai subarashi
              }}
            />
          </div>
        </>
        <LoginTextLink
          position={"relative"}
        />
      </form>
      {error && <p className={styles.errtext}>{error}</p>}
      <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
    </div>
  );
}

export default NgoRegisterForm;
