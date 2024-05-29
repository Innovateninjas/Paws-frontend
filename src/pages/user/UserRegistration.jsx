import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../Components/shared/InputField";
import ReactiveButton from "reactive-button";
import custBackgroundImage from "../user/imgs/pngtree-blue-pastel-background-picture-image_1599663.jpg";
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import i1 from '../user/imgs/white-dog-pastel-blue-background-3d_89917-269.jpg';
import { login, registration } from "../../utils/Functions/userAuthService";
import LoginTextLink from "../../Components/shared/LoginTextLink";

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
  let isLogin = location.pathname !== "/register";

  const customButtonStyle = {
    borderRadius: "20px",
    background: "linear-gradient(to bottom, #b3d9ff, #3399ff)",
    padding: "16px 32px",
    marginTop: "1rem",
    fontSize: "18px",
    fontWeight: "800",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.1rem",
    width: "fit-content",
    margin: "auto",
  };

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


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 lg:px-8">
      <CustomBackground image={custBackgroundImage} />
      <div className="w-full max-w-6xl flex flex-row sm:flex-col items-center justify-center rounded-xl shadow-2xl p-6 lg:p-12">
        <div className="w-full  flex justify-center items-center mb-8 lg:mb-0">
          <form className="flex flex-col gap-4 w-full max-w-md">
            {!isLogin && (
              <>
                <h1 className="text-center text-indigo-900 font-semibold text-2xl lg:text-3xl">Create Account</h1>
                <InputField
                  className="h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
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
                  className="h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
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
              <h1 className="text-center text-indigo-900 font-bold text-2xl lg:text-3xl underline">Welcome Back</h1>
            )}
            <InputField
              className="h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              required
            />
            <div className="relative w-full">
  <InputField
    className="w-full h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
    type={isPassVisible ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => {
      setError("");
      setPassword(e.target.value);
      validate(e.target.value);
      setUserTypingPassword(e.target.value.length > 0);
    }}
    required
  />
  {isPassVisible ? (
    <FaEye
      className="absolute right-4 top-3 text-blue-500 cursor-pointer"
      onClick={() => setIsPassVisible(false)}
    />
  ) : (
    <FaEyeSlash
      className="absolute right-4 top-3 text-blue-500 cursor-pointer"
      onClick={() => setIsPassVisible(true)}
    />
  )}
</div>

            {userTypingPassword && (
              <div className="text-left w-full mt-2">
                <p className={`text-sm ${isMinLength ? 'text-green-500' : 'text-red-500'}`}>• Minimum 8 characters</p>
                <p className={`text-sm ${hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>• At least one uppercase letter</p>
                <p className={`text-sm ${hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>• At least one lowercase letter</p>
                <p className={`text-sm ${hasNumber ? 'text-green-500' : 'text-red-500'}`}>• At least one number</p>
                <p className={`text-sm ${hasSymbol ? 'text-green-500' : 'text-red-500'}`}>• At least one symbol</p>
              </div>
            )}
            {!isLogin && (
              <>
                <div className="w-full relative flex justify-center mt-4">
                  <ReactiveButton
                    style={customButtonStyle}
                    buttonState={state}
                    idleText="Register"
                    loadingText="Wait..."
                    successText="Logged In"
                    errorText="Error"
                    messageDuration={3000}
                    disabled={!(isMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol)}
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
                    <p className="absolute top-[-20px] w-full text-center text-red-500 font-semibold">
                      {error}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col mt-8 gap-2 items-center">
                  <LoginTextLink />
                  <LoginTextLink
                    text={"Are you an NGO?"}
                    link={"/ngoregister"}
                    linkText={"Register Here!"}
                    className="text-indigo-800 underline"
                  />
                </div>
              </>
            )}
            {isLogin && (
              <div className="w-full relative flex justify-center mt-4">
                <ReactiveButton
                  style={customButtonStyle}
                  buttonState={state}
                  idleText="Login"
                  loadingText="Wait..."
                  successText="Logged In"
                  errorText="Error"
                  onClick={async () =>
                    login(email, password, setError, setButtonState)
                  }
                />
                {error && (
                  <p className="absolute top-[-20px] w-full text-center text-red-500 font-semibold">
                    {error}
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
        <div className="sm:w-full flex justify-center items-center p-4 lg:mt-0 mt-8">
  <img className="block  sm:hidden rounded-xl w-2/3" src={i1} alt="Cute dog" />
</div>

      </div>
    </div>
  );
  
}

export default LoginRegisterForm;
