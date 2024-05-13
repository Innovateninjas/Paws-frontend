import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import custBackgroundImage from "../user/imgs/pngtree-blue-pastel-background-picture-image_1599663.jpg"; // Import your background image

import i1 from '../user/imgs/white-dog-pastel-blue-background-3d_89917-269.jpg';
import { login, registration } from "../../utils/Functions/userAuthService";
import LoginTextLink from "../../Components/shared/LoginTextLink";
function CustomBackground({ image }) {
  const backgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return <div style={backgroundStyle}></div>;
}

function LoginRegisterForm() {
  const location = useLocation();

  let isLogin = true;
  if (location.pathname === "/register") {
    isLogin = !isLogin;
  }

  const customButtonStyle = {
    borderRadius: "20px", // Adjust the border radius as needed
    background: "linear-gradient(to bottom, #b3d9ff, #3399ff)", // Adjust gradient colors
    padding: "20px 40px",
    marginTop: "0.675rem",
    fontSize: "22px",
    fontWeight: "800",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.2rem",
    width: "fit-content",
    margin: "auto",
  };
  
  const [name, setname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");

  useEffect(() => {
    setError("");
  }, [isLogin]);

  return (
    <div className="h-full w-screen flex items-center justify-center mb-[60px]">
      <style>
        {`
          #scaledImage {
            width: 65%; /* Set the desired width */
            height: auto; /* Maintain aspect ratio */
          }
        `}
      </style>
        <CustomBackground image={custBackgroundImage} />
      <div className="container min-h-screen flex flex-row ">
        <div className="w-1/2 flex justify-center items-center">
          <div className="">
            <form className="flex gap-[20px] items-center justify-start flex-col ">
              {!isLogin && (
                <>
                  <h1 className="mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-semibold text-[2.5em] ">Create Account</h1>
                  <InputField
  className="placeholder-stone h-16 mt-5 bg-opacity-45 w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => {
    setError("");
    setname(e.target.value);
  }}
  style={{ marginBottom: "-2px" }} // Adjust this value as needed
  required
/>

                  <InputField
                    className="placeholder-stone h-16 mt-5 bg-opacity-45 w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                    type="tel"
                    placeholder="Phone Number"
                    value={phone_number}
                    onChange={(e) => {
                      setError("");
                      setPhone_number(e.target.value);
                    }}
                    required
                  />
                </>
              )}
              {isLogin && 
              <>
                <h1 className="mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[2.5em] underline"> Welcome Back</h1>
              </>
              }
              <InputField
                className="placeholder-stone h-16 mt-5 bg-opacity-45 w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                required
              />
              <InputField
                className="placeholder-stone h-16 mt-5 bg-opacity-45 w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
                required
              />
              {!isLogin && (
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
                      onClick={async () =>
                        registration(
                          name,
                          phone_number,
                          email,
                          password,
                          setError,
                          setButtonState
                        )
                      }
                    />
                    {error && <p className="absolute top-[-25px] w-screen tracking-wide text-red-500 font-semibold text-center">{error}</p>}
                  </div>
                </>
              )}
              {!isLogin && (
                <>
                  <div className="w-screen h-fit flex flex-col mt-3 gap-2 items-center">
                    <LoginTextLink />
                    <LoginTextLink
                      text={"Are you an NGO ?"}
                      link={"/ngoregister"}
                      linkText={"Register Here!"}
                      className="text-indigo-800 underline"
                    />
                  </div>
                </>
              )}
              {isLogin && (
                <div className="w-screen relative mt-7 h-fit flex justify-center">
                  <ReactiveButton
                    style={customButtonStyle}
                    buttonState={state}
                    idleText="Login"
                    loadingText="wait.."
                    successText="Logging In"
                    errorText="Login"
                    onClick={async () =>
                      login(email, password, setError, setButtonState)
                    }
                  />
                  {error && <p className="absolute w-screen top-[-40px] tracking-wide text-red-500 font-semibold text-center">{error}</p>}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="image-container w-1/2 flex justify-center items-center">
          <img className="rounded-xl " id="scaledImage" src={i1} alt="Cute dog" />
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterForm;
