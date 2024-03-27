import React, { useState, useEffect } from "react";
import InputField from "../../Components/InputsFields/bigInputs";
import ReactiveButton from "reactive-button";
import Creatable from 'react-select/creatable';
import { registration } from "../../Components/utils/Functions/ngoAuthService";
import LoginTextLink from "../../Components/LoginLinkText/LoginTextLink";
import getUserLocation from "../../Components/utils/Functions/getLocationData";
import { AnimalList } from "./animalList";
import Background from "../../Components/backgroundComponent/Background";

// import { shadow } from "@cloudinary/url-gen/actions/effect";]
function NgoRegisterForm() {

  const customButtonStyle = {
    borderRadius: "40px",
    background: "linear-gradient(to bottom, #48bb78, #2f855a)",
    padding: "20px 40px",
    marginTop: "0.675rem",
    fontSize: "19px",
    fontWeight: "700",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.2em",
    width:"fit-content",
    margin:"auto"
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
    <div className="h-full pt-9 w-screen flex items-center justify-center mb-[200px]">
    <Background/>
      <form className="flex gap-[20px] items-center justify-center flex-col">
        <>
          <h1 className="text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold text-[2.5em] underline">Join Us Today</h1>
          {/* NAME */}
          <InputField
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
            type="text"
            placeholder="Address"
            value={lcation}
            onChange={(e) => {
              setError("");
              setLocation(e.target.value);
            }}
          />

          <Creatable
            className="placeholder-stone flex justify-center z-20 h-16 bg-opacity-45 w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
          <div className="w-screen h-[70px] mt-5 flex justify-center">
            <ReactiveButton
              style={customButtonStyle}
              buttonState={state}
              idleText="Register"
              loadingText="wait.."
              successText="Logging In"
              errorText="Register"
              messageDuration={3000}
              onClick={async () => {
                // console.log(
                //   orgName,
                //   phoneNumber,
                //   email,
                //   emergency,
                //   password,
                //   animalSupported,
                //   lcation,
                //   websiteLink,
                //   latitude,
                //   longitude);           
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
        <div className="w-screen h-fit flex flex-col mt-3 gap-2 items-center">
        <LoginTextLink
        />
        <LoginTextLink
          text={"Not an Ngo ?"}
          link={"/register"}
          linkText={"Register Here!"}
        />
        </div>
      </form>
      {error && <p className="absolute bottom-[4%] tracking-wide text-red-500 font-semibold text-center">{error}</p>}
    </div>
  );
}

export default NgoRegisterForm;
