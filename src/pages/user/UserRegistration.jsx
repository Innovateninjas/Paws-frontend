import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import custBackgroundImage from "../user/imgs/pngtree-blue-pastel-background-picture-image_1599663.jpg"; // Import your background image
import {FaEye,FaEyeSlash} from 'react-icons/fa6'
import i1 from '../user/imgs/white-dog-pastel-blue-background-3d_89917-269.jpg';
import { login, registration } from "../../utils/Functions/userAuthService";
import LoginTextLink from "../../Components/shared/LoginTextLink";
import AlertDialog from "../../Components/shared/AlertDialog";

// import Validator from 'validator';

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
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [userTypingPassword, setUserTypingPassword] = useState(false);
  let isLogin = true;
  if (location.pathname === "/register") {
    isLogin = !isLogin;
  }

  // const googleButtonStyle = {
  //   borderRadius: "40px",
  //   display: "flex",
  //   background: "#FFFFFF", // Google White
  //   color: "#3f3f3f", // Google Gray
  //   padding: "10px 10px",
  //   fontSize: "16px",
  //   fontWeight: "bold",
  //   boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  //   cursor: "pointer",
  //   border: "1px solid #dadce0", // Google Gray
  //   transition: "background-color 0.2s, box-shadow 0.2s",
  // };

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

  // const [errorMessage, setErrorMessage] = useState("");
  const [name, setname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");

  const [isMinLength, setIsMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  const [isOpenConfirmBox , setIsOpenConfirmBox ] = useState(false);

  useEffect(() => {
    setError("");
  }, [isLogin]);

  const validate = (value) => {
    setIsMinLength(value.length >= 8);
    setHasUpperCase(/[A-Z]/.test(value));
    setHasLowerCase(/[a-z]/.test(value));
    setHasNumber(/[0-9]/.test(value));
    setHasSymbol(/[^A-Za-z0-9]/.test(value));
  };

  // user Registration
  const handleRegistration = async () => {
    const res = await registration(
      name,
      phone_number,
      email,
      password,
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
      window.location.href = "/user?upload=true";
    }

    setIsOpenConfirmBox(false);
  };

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
      <div style={{
          overflowY: 'scroll',
          height: '100vh',
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 transparent',
        }}>
        <div>
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
                  <div className="relative">

              <InputField
                className="placeholder-stone h-16 mt-5 bg-opacity-45 w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                type={`${isPassVisible?"text":"password"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                  validate(e.target.value);
                  setPassword(e.target.value);
                  if (e.target.value.length > 0) {
                    setUserTypingPassword(true);
                  } else {
                    setUserTypingPassword(false);
                  }
                }}
                required
              />
            {
              isPassVisible?<FaEye className="absolute right-[10px] text-[#59cceb] top-8" onClick={()=>setIsPassVisible(false)} size={"40px"}/>:<FaEyeSlash className="absolute right-[10px] text-[#59cceb] top-8" onClick={()=>setIsPassVisible(true)} size={"40px"}/>
            }
              </div>
              {userTypingPassword && <div className="text-left w-80 mt-2">
                <p style={{ color: isMinLength ? 'green' : 'red' }}>• Minimum 8 characters</p>
                <p style={{ color: hasUpperCase ? 'green' : 'red' }}>• At least one uppercase letter</p>
                <p style={{ color: hasLowerCase ? 'green' : 'red' }}>• At least one lowercase letter</p>
                <p style={{ color: hasNumber ? 'green' : 'red' }}>• At least one number</p>
                <p style={{ color: hasSymbol ? 'green' : 'red' }}>• At least one symbol</p>
              </div>}

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
                          disabled={!(isMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol)}
                          onClick={handleRegistration}
                        />
                        {error && <p className="absolute top-[-25px] w-screen tracking-wide text-red-500 font-semibold text-center" style={{marginLeft:'35%',marginRight:'35%'}}>{error}</p>}
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
      </div>
      {/* Alert Dialog for profile */}
      <AlertDialog
        open={isOpenConfirmBox}
        handleClose={closeConfirmationDialog}
      />
    </div>
  );
}

export default LoginRegisterForm;