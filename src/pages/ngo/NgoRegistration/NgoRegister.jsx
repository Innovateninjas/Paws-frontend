import React, { useState, useEffect } from "react";
import InputField from "../../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import Creatable from 'react-select/creatable';
import { registration } from "../../../utils/Functions/ngoAuthService";
import LoginTextLink from "../../../Components/shared/LoginTextLink";
import getUserLocation from "../../../utils/Functions/getLocationData";
import { AnimalList } from "./animalList";
import Background from "../../../Components/shared/Background";
import AlertDialog from "../../../Components/shared/AlertDialog";


// import { shadow } from "@cloudinary/url-gen/actions/effect";]
function NgoRegisterForm() {
  
  const customButtonStyle = {
    borderRadius: "40px",
    background: "linear-gradient(to bottom, #16a34a, #15803d)",
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
  const [darpanid, setDarpanid] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [isOpenConfirmBox, setIsOpenConfirmBox] = useState(false);

  useEffect(() => {
    getUserLocation(setLatitude, setLongitude);
  }, []);

  // ngo Registration
  const handleRegistration = async () => {
    const res = await registration(
      orgName,
      phoneNumber,
      email,
      emergency,
      password,
      animalSupported,
      lcation,
      darpanid,
      latitude,
      longitude,
      setError,
      setButtonState
    );

    // when res is success then only show confirmation dialog
    if (res) {
      setTimeout(() => {
        setIsOpenConfirmBox(() => true);
      }, 3000);
    }
  };

  // condition based rendering when resigration successful
  const closeConfirmationDialog = (isUploadPhoto) => {
    if (isUploadPhoto) {
      window.location.href = "/";
    } else {
      window.location.href = "/ngoProfile?upload=true";
    }

    setIsOpenConfirmBox(false);
  };

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
            type="tel"
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
            styles={{
              control: base => ({
                ...base,
                height: "4rem",
                width: '20rem',
                border: '0',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: "3.847223997116089px 4.946430683135986px 14.289689064025879px 0px #00000040",
                borderRadius: '30px',
                padding: '0.5rem 1rem',
                fontSize: '16px',
                backdropFilter: 'blur(6px)',
                outline: '0',
                overflow: 'scroll',
                position: 'relative',

              }),

              multiValue: (provided, state) => ({
                ...provided,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                fontSize: '18px',
                marginLeft: '5px',
                padding: '2px',
              }),
              clearIndicator: (provided, state) => ({
                ...provided,
                color: 'rgb(244 63 94)',
              }),
              placeholder: defaultStyles => ({
                ...defaultStyles,
                color: '#53605B',
                fontSize: '18px',
              }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: 'black',
                lineHeight: '32px',
              }),
            }}

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
            type="tel"
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
            placeholder=" NGO-DARPAN ID (STATE/YEAR/ID)"
            value={darpanid}
            onChange={(e) => {
              setError("");
              setDarpanid(e.target.value);
            }
          }
          />
        </>
        <>
          <div className="w-screen relative h-[70px] mt-5 flex justify-center">
            <ReactiveButton
              style={customButtonStyle}
              buttonState={state}
              idleText="Register"
              loadingText="wait.."
              successText="Logging In"
              errorText="Register"
              messageDuration={3000}
              onClick={handleRegistration}
            />
            {error && <p className="absolute top-[-25px] tracking-wide text-red-500 font-semibold text-center">{error}</p>}
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

      {/* Alert Dialog for profile */}
      <AlertDialog
        open={isOpenConfirmBox}
        handleClose={closeConfirmationDialog}
      />
    </div>
  );
}

export default NgoRegisterForm;
