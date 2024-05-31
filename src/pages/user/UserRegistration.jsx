import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import custBackgroundImage from "../user/imgs/pngtree-blue-pastel-background-picture-image_1599663.jpg"; // Import your background image
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import i1 from "../user/imgs/white-dog-pastel-blue-background-3d_89917-269.jpg";
import { login, registration } from "../../utils/Functions/userAuthService";
import LoginTextLink from "../../Components/shared/LoginTextLink";
import AlertDialog from "../../Components/shared/AlertDialog";

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
  const [userTypingPassword, setUserTypingPassword] = useState(false);
  const isLogin = location.pathname !== "/register";

  const customButtonStyle = {
    borderRadius: "20px",
    background: "linear-gradient(to bottom, #b3d9ff, #3399ff)",
    padding: "20px 40px",
    marginTop: "0.675rem",
    fontSize: "22px",
    fontWeight: "800",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.2rem",
    width: "fit-content",
    margin: "auto",
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
  const [isPassVisible, setIsPassVisible] = useState(false);

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
    <div className="h-full w-screen flex items-center justify-center mb-[60px]">
      <CustomBackground image={custBackgroundImage} />
      <div
        style={{
          overflowY: "scroll",
          height: "100vh",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
        }}
      >
        <div className="">
          <div className="w-[95%] lg:w-[80%] my-20 mx-auto p-10 shadow-[0_0_20px_#00000080] rounded-3xl min-h-screen flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex justify-center items-center">
              <div className="">
                <form className="flex gap-[20px] items-center justify-start flex-col ">
                  {!isLogin && (
                    <>
                      <h1 className="mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-semibold text-[2.5em]">
                        Create Account
                      </h1>
                      <InputField
                        className="placeholder-stone h-12 md:h-16 mt-5 bg-opacity-45 w-72 md:w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
                        className="placeholder-stone h-12 md:h-16 mt-5 bg-opacity-45 w-72 md:w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
                      <h1 className="mt-[60px] text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[2.5em] underline">
                        Welcome Back
                      </h1>
                    </>
                  )}
                  <InputField
                    className="placeholder-stone h-12 md:h-16 mt-5 bg-opacity-45 w-72 md:w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
                      className="placeholder-stone h-12 md:h-16 mt-5 bg-opacity-45 w-72 md:w-80 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
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
                        className="absolute right-[10px] text-[#59cceb] top-8"
                        onClick={() => setIsPassVisible(false)}
                        size={25}
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-[10px] text-[#59cceb] top-8 mt-0 md:mt-2"
                        onClick={() => setIsPassVisible(true)}
                        size={25}
                      />
                    )}
                  </div>

                  {!isLogin && (
                    <div className="text-left pl-5 md:pl-0 w-80 mt-2">
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
                    <div className="w-screen relative h-[70px] mt-5 flex justify-center">
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
                      {error && (
                        <p className="absolute w-screen top-[-40px] tracking-wide text-red-500 font-semibold text-center">
                          {error}
                        </p>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="image-container lg:w-1/2 hidden lg:flex justify-center items-center py-20 lg:py-0">
              <img
                className="rounded-xl w-[60%] md:w-[30%] lg:w-[60%] h-auto"
                id="scaledImage"
                src={i1}
                alt="Cute dog"
              />
            </div>
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
