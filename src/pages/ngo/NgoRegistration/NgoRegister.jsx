import React, { useState, useEffect } from "react";
import InputField from "../../../Components/shared/InputField";
import Creatable from "react-select/creatable";
import { registration } from "../../../utils/Functions/ngoAuthService";
import LoginTextLink from "../../../Components/shared/LoginTextLink";
import getUserLocation from "../../../utils/Functions/getLocationData";
import { AnimalList } from "./animalList";
import Background from "../../../Components/shared/Background";

// import { shadow } from "@cloudinary/url-gen/actions/effect";]
function NgoRegisterForm() {

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
  useEffect(() => {
    getUserLocation(setLatitude, setLongitude);
  }, []);

  const inputClass =
    "placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-80 px-6 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow";

  return (
    <div className="h-full pt-9 w-screen ">
      <Background />

      <h1 className="text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold text-[2.5em] underline">
        Join Us Today
      </h1>

      <div className="flex   justify-center items-center flex-col">
        <form className="flex gap-5 items-center h-fit max-w-[80rem] px-4 w-full justify-center flex-col ">
          <>
            <div className="flex justify-center flex-wrap gap-4 ">
              {/* NAME */}
              <InputField
                className={inputClass}
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
                className={inputClass}
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setError("");
                  setPhoneNumber(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex justify-center flex-wrap gap-4 ">
              {/* EMAIL */}
              <InputField
                className={inputClass}
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
                className={inputClass}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            {/* LOCATION */}
            <div className="flex justify-center gap-4 sm:w-[41rem]  ">
              <InputField
                className={`${inputClass} w-80 sm:w-full`}
                type="text"
                placeholder="Address"
                value={lcation}
                onChange={(e) => {
                  setError("");
                  setLocation(e.target.value);
                }}
              />
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <Creatable
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "4rem",
                    width: "20rem",
                    border: "0",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    boxShadow:
                      "3.847223997116089px 4.946430683135986px 14.289689064025879px 0px #00000040",
                    borderRadius: "30px",
                    padding: "0.5rem 1rem",
                    fontSize: "16px",
                    backdropFilter: "blur(6px)",
                    outline: "0",

                    position: "relative",
                  }),

                  multiValue: (provided, state) => ({
                    ...provided,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "30px",
                    fontSize: "18px",
                    marginLeft: "5px",
                    padding: "2px",
                  }),
                  clearIndicator: (provided, state) => ({
                    ...provided,
                    color: "rgb(244 63 94)",
                  }),
                  placeholder: (defaultStyles) => ({
                    ...defaultStyles,
                    color: "#53605B",
                    fontSize: "18px",
                  }),
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    color: "black",
                    lineHeight: "32px",
                  }),
                }}
                isMulti={true}
                placeholder="Animal Supported"
                options={AnimalList}
                onChange={(selectedOptions) => {
                  const animalNames = selectedOptions.map(
                    (option) => option.label
                  );
                  setError("");
                  setanimalSupported(animalNames);
                }}
              />

              {/* EMERGENCY CONTACT NUMBER */}
              <InputField
                className={inputClass}
                type="tel"
                placeholder="Emergency Contact Number"
                value={emergency}
                onChange={(e) => {
                  setError("");
                  setEmergency(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center gap-4 sm:w-[41rem] ">
              {/* WEBSITE LINK  */}
              <InputField
                className={`${inputClass} w-80 sm:w-full`}
                type="text"
                placeholder=" NGO-DARPAN ID (STATE/YEAR/ID)"
                value={darpanid}
                onChange={(e) => {
                  setError("");
                  setDarpanid(e.target.value);
                }}
              />
            </div>
          </>
          <>
            <div className="w-screen relative flex justify-center">
              <button
          className="loginSignupButton"
                onClick={async () => {
                  registration(
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
                }}
              >Register</button>
              {error && (
                <p className="absolute top-[-25px] tracking-wide text-red-500 font-semibold text-center">
                  {error}
                </p>
              )}
            </div>
          </>
        </form>
      </div>
      <div className="flex flex-col mt-12 gap-2 items-center w-full mb-20 ">
        <LoginTextLink />
        <LoginTextLink
          text={"Not an Ngo ?"}
          link={"/register"}
          linkText={"Register Here!"}
        />
      </div>
    </div>
  );
}

export default NgoRegisterForm;
