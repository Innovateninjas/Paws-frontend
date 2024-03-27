import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/InputsFields/bigInputs";
import ReactiveButton from "reactive-button";
import Background from "../../Components/backgroundComponent/Background";
import {
  login,
  registration,
} from "../../Components/utils/Functions/userAuthService";
import LoginTextLink from "../../Components/LoginLinkText/LoginTextLink";
function LoginRegisterForm() {
  const location = useLocation();

  let isLogin = true;
  if (location.pathname === "/register") {
    isLogin = !isLogin;
  }

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
  const [name, setname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");

  return (
    <>    
    
    <Background/>
 <div className="min-h-screen">
      <form className="flex gap-[20px] items-center justify-center flex-col">
        {!isLogin && (
          <>
            <h1 className=" mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold text-[2.5em] underline">Create account</h1>
            <InputField
              className="placeholder-stone h-16 mt-5 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setError("");
                setname(e.target.value);
              }}
              required
            />
            <InputField
              className="placeholder-stone h-16 mt-5 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
        <h1 className=" mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[2.5em] underline "> Welcome Back</h1>}
        <InputField
          className="placeholder-stone h-16 mt-5 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
          className="placeholder-stone h-16 mt-5 bg-opacity-45 backdrop-blur-[6px] w-80 px-4 py-2 items-center outline-0 rounded-[30px] text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
            <div className="w-screen h-[70px] mt-5 flex justify-center">
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
            />
            </div>
          </>
        )}
        {isLogin && (
          <div className="w-screen mt-5 h-fit flex justify-center">
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
          </div>
        )}
      </form>
      {error && <p className="absolute w-screen bottom-[29%] tracking-wide text-red-500 font-semibold text-center">{error}</p>}
</div>
    </>

  );
}

export default LoginRegisterForm;
