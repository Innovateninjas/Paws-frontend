import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../services/operations/authAPI";
import { registration } from "../../utils/Functions/userAuthService";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  // const { signupData, loading } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    const registrationData = JSON.parse(localStorage.getItem("registrationData"));

    if (!registrationData || registrationData == null) {
      navigate("/register");
    }

    console.log(registrationData);

    const verificationOTP = JSON.parse(localStorage.getItem("verificationOTP"));
    console.log(verificationOTP)

    if (otp !== String(verificationOTP)) {
      alert("Wrong OTP ,try again");
      setOtp("");
    }

    const res = await registration(
      registrationData.name,
      registrationData.phone_number,
      registrationData.email,
      registrationData.password,
      registrationData.setError,
      registrationData.setButtonState,
    );

    if (res) {
      localStorage.removeItem("verificationOTP");
      localStorage.removeItem("registrationData");
      navigate("/");
    }
    else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-[#79D8FC] min-h-[calc(100vh-3.5rem)] grid place-items-center">
        
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            {/* <Link to="/">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link> */}
            <button
              className="flex items-center text-rose-700 gap-x-2"
              onClick={() => {}}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
    </div>
  );
}

export default VerifyEmail;
