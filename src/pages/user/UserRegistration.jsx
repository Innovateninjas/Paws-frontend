import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import Background from "../../Components/shared/Background";
import {
  googleLogin,
  googleSignup,
  login,
  registration,
} from "../../utils/Functions/userAuthService";
import LoginTextLink from "../../Components/shared/LoginTextLink";

function LoginRegisterForm() {
  const location = useLocation();

  let isLogin = true;
  if (location.pathname === "/register") {
    isLogin = !isLogin;
  }

  const googleButtonStyle = {
    borderRadius: "40px",
    display: "flex",
    background: "#FFFFFF", // Google White
    color: "#3f3f3f", // Google Gray
    padding: "10px 10px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
    cursor: "pointer",
    border: "1px solid #dadce0", // Google Gray
    transition: "background-color 0.2s, box-shadow 0.2s",
  };
  const customButtonStyle = {
    borderRadius: "40px",
    background: "linear-gradient(to bottom, #16a34a, #15803d)",
    padding: "10px 20px",
    marginTop: "0.675rem",
    fontSize: "22px",
    fontWeight: "800",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.2rem",
    width: "fit-content",
    margin: "0px",
  };

  const [name, setname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");
 useEffect(() => {
  setError("");
 },[isLogin])

 const handleLoginClick = async () => {
    if (!email) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }
    login(email, password, setError, setButtonState);
  };

=======

  useEffect(() => {
    setError("");
  }, [isLogin]);
  return (
    <>
      <div className="h-full w-screen flex items-center justify-center mb-[60px]">
        <Background />
        <div className="min-h-screen">
          <form className="flex gap-[20px] items-center justify-center flex-col">
            {!isLogin && (
              <>
                <h1 className=" mt-[40px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold text-[2.5em] underline">
                  Create account
                </h1>
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
            {isLogin && (
              <>
                <h1 className=" mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[2.5em] underline ">
                  {" "}
                  Welcome Back
                </h1>
              </>
            )}
            <InputField
              // h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow
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
          </>
        )}

        
        {isLogin && 
        <>

        <h1 className=" mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[2.5em] underline "> Welcome Back</h1>
        </>
        
        }
        <InputField
        // h-16 bg-opacity-15 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow 
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
            onClick={handleLoginClick} // Modified here
          />
          {error && <p className="absolute w-screen top-[-40px] tracking-wide text-red-500 font-semibold text-center">{error}</p>}
          </div>
        )}
      </form>
      
</div>
</div>
    </>


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
                  {error && (
                    <p className="absolute top-[-25px] w-screen tracking-wide text-red-500 font-semibold text-center">
                      {error}
                    </p>
                  )}
                </div>
                <ReactiveButton
                  style={{ ...googleButtonStyle }} // Spread the styles                  buttonState={googleButtonState}
                  idleText={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/images/search.png"
                        alt="Google Icon"
                        style={{
                          marginRight: "5px",
                          width: "24px",
                          height: "24px",
                        }} // Adjust width and height as needed
                      />
                      Sign up with Google
                    </div>
                  }
                  loadingText={
                    <>
                      <img
                        src="path_to_your_external_icon_image"
                        alt="Google Icon"
                        style={{
                          marginRight: "5px",
                          width: "24px",
                          height: "24px",
                        }} // Adjust width and height as needed
                      />
                      Signing In with Google
                    </>
                  }
                  successText="Signing In with Google"
                  errorText="Sign up with Google"
                  onClick={async () => googleSignup(setError, setButtonState)}
                />
              </>
            )}
            {!isLogin && (
              <>
                <div className="w-screen h-fit flex flex-col mt-2 gap-1 items-center">
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
              <div>
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
                  {error && (
                    <p className="absolute w-screen top-[-40px] tracking-wide text-red-500 font-semibold text-center">
                      {error}
                    </p>
                  )}
                </div>
                <div className="w-screen relative mt-10 h-fit flex justify-center">
                  <ReactiveButton
                    style={{ ...googleButtonStyle }} // Spread the styles                  buttonState={googleButtonState}
                    idleText={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src="/images/search.png"
                          alt="Google Icon"
                          style={{
                            marginRight: "5px",
                            width: "24px",
                            height: "24px",
                          }} // Adjust width and height as needed
                        />
                        Sign In with Google
                      </div>
                    }
                    loadingText={
                      <>
                        <img
                          src="path_to_your_external_icon_image"
                          alt="Google Icon"
                          style={{
                            marginRight: "5px",
                            width: "24px",
                            height: "24px",
                          }} // Adjust width and height as needed
                        />
                        Signing In with Google
                      </>
                    }
                    successText="Signing In with Google"
                    errorText="Sign up with Google"
                    onClick={async () => googleLogin(setError, setButtonState)}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginRegisterForm;

