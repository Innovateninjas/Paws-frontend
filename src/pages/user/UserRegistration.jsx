import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import custBackgroundImage from "../user/imgs/pngtree-blue-pastel-background-picture-image_1599663.jpg";
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import i1 from '../user/imgs/white-dog-pastel-blue-background-3d_89917-269.jpg';
import { login, registration } from "../../utils/Functions/userAuthService";
import LoginTextLink from "../../Components/shared/LoginTextLink";
import AlertDialog from "../../Components/shared/AlertDialog";

function CustomBackground({ image }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
}

function LoginRegisterForm() {
  const location = useLocation();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [userTypingPassword, setUserTypingPassword] = useState(false);
  const isLogin = location.pathname !== "/register";

  const customButtonStyle = {
    borderRadius: "20px",
    background: "linear-gradient(to bottom, #b3d9ff, #3399ff)",
    padding: "20px 40px",
    fontSize: "22px",
    fontWeight: "800",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.1rem",
    width: "fit-content",
  };

  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setButtonState] = useState("idle");

  const [isMinLength, setIsMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  const [isOpenConfirmBox, setIsOpenConfirmBox] = useState(false);

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

  const handleRegistration = async () => {
    const res = await registration(
      name,
      phone_number,
      email,
      password,
      setError,
      setButtonState
    );

    if (res) {
      setTimeout(() => {
        setIsOpenConfirmBox(true);
      }, 3000);
    }
  };

  const closeConfirmationDialog = (isUploadPhoto) => {
    if (isUploadPhoto) {
      window.location.href = "/";
    } else {
      window.location.href = "/user?upload=true";
    }

    setIsOpenConfirmBox(false);
  };

  return (
    <div className="flex items-center justify-center mb-[60px] overflow-x-hidden">
      <CustomBackground image={custBackgroundImage} />
      <div
        style={{
          overflowY: "scroll",
          height: "100vh",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
        }}
        className="p-10 md:p-0"  
      >
        <div className=" w-full flex justify-center items-center shadow-[0_2px_20px_rgba(0,0,0,0.5)] rounded-3xl md:rounded-none md:shadow-[0_0px_0px_rgba(0,0,0,0)]">
          
          <form className="w-[50%] md:w-full gap-[1rem] flex flex-col justify-center items-center py-20">
            {!isLogin && (
              <>
                <h1 className="w-[85%] text-center z-[3] text-indigo-900 font-semibold text-[2.5em] md:text-[2rem]">
                  Create Account
                </h1>
                <InputField
                  className="placeholder-stone h-12 md:h-12 mt-5 bg-opacity-45 w-80 sm:w-60 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => {
                    setError("");
                    setName(e.target.value);
                  }}
                  required
                />
                <InputField
                  className="placeholder-stone h-12 md:h-12 mt-5 bg-opacity-45 w-80 sm:w-60 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                  type="tel"
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => {
                    setError("");
                    setPhoneNumber(e.target.value);
                  }}
                  required
                />
              </>
            )}
            {isLogin && (
              <>
                <h1 className="mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[2.5em]">
                  Welcome Back
                </h1>
              </>
            )}
            <InputField
              className="placeholder-stone h-12 md:h-12 mt-5 bg-opacity-45 w-80 sm:w-60 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              required
            />
            <div className="relative w-80 sm:w-60 flex justify-center items-center">
              <InputField
                className="placeholder-stone h-12 md:h-12 mt-5 bg-opacity-45 w-full px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
                type={isPassVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                  validate(e.target.value);
                }}
                required
              />
              {isPassVisible ? (
                <FaEye
                  className="absolute right-6 text-[#5979eb] top-[45%] z-[1]"
                  onClick={() => setIsPassVisible(false)}
                  size={25}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-6 text-[#5979eb] top-[45%] z-[1]"
                  onClick={() => setIsPassVisible(true)}
                  size={25}
                />
              )}
            </div>

            {!isLogin && (
              <div className="text-left w-80 sm:w-60">
                <p style={{ color: isMinLength ? "green" : "red" }}>
                  • Minimum 8 characters
                </p>
                <p style={{ color: hasUpperCase ? "green" : "red" }}>
                  • At least one uppercase letter
                </p>
                <p style={{ color: hasLowerCase ? "green" : "red" }}>
                  • At least one lowercase letter
                </p>
                <p style={{ color: hasNumber ? "green" : "red" }}>
                  • At least one number
                </p>
                <p style={{ color: hasSymbol ? "green" : "red" }}>
                  • At least one symbol
                </p>
              </div>
            )}

            {!isLogin && (
              <>
                <div className="w-screen relative h-20 flex justify-center">
                  <ReactiveButton
                    style={customButtonStyle}
                    buttonState={state}
                    idleText="Register"
                    loadingText="wait.."
                    successText="Registered"
                    errorText="Register"
                    messageDuration={3000}
                    disabled={
                      !(
                        isMinLength &&
                        hasUpperCase &&
                        hasLowerCase &&
                        hasNumber &&
                        hasSymbol
                      )
                    }
                    onClick={handleRegistration}
                  />
                  {error && (
                    <p className="absolute top-[-25px] w-screen tracking-wide text-red-500 font-semibold text-center" style={{ marginLeft: "35%", marginRight: "35%" }}>
                      {error}
                    </p>
                  )}
                </div>
                <LoginTextLink
                  text={"Register as an NGO"}
                  link={"/ngoregister"}
                  linkText={"Here!"}
                />
              </>
            )}

            {isLogin && (
              <>
                <div className="w-screen relative h-20 flex justify-center">
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
                <LoginTextLink
                  text={"register now"}
                  link={"/register"}
                  linkText={"Here!"}
                />
              </>
            )}
          </form>

          <div className="w-[50%] flex justify-center items-center md:hidden">
            <img
              className="rounded-xl w-[20rem]"
              id="scaledImage"
              src={i1}
              alt="Cute dog"
            />
          </div>
          
        </div>

      </div>
      <AlertDialog
        open={isOpenConfirmBox}
        handleClose={closeConfirmationDialog}
      />
    </div>
  );
  
}

export default LoginRegisterForm;