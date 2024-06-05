import emailjs from "@emailjs/browser";
// import { useRef } from "react";

function SendOtp(registrationData) {

  const otp = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("verificationOTP", JSON.stringify(otp));

    const templateParams = {
    name: registrationData.name,
    email: registrationData.email,
    otp: otp,
  };
    
    // const data = useRef();
    // data.current = templateParams;

  emailjs.send(process.env.REACT_APP_serviceID, process.env.REACT_APP_templateID, templateParams, {
    publicKey: process.env.REACT_APP_public_key,
  });

  return;
}

export default SendOtp;
