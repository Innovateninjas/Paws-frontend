import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiPawPrintFill } from "react-icons/pi";
import ReactiveButton from "reactive-button";
import InputField from "../../Components/shared/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";

const customButtonStyle = {
  borderRadius: "20px",
  background: "linear-gradient(to bottom, #b3d9ff, #3399ff)",
  padding: "20px 40px",
  fontSize: "12px",
  fontWeight: "800",
  boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
  letterSpacing: "0.1rem",
  width: "fit-content",
};
const stars = Array.from({ length: 45 /*no of stars*/ }, (_, i) => (
    <FaStar
      key={i}
      className="absolute text-white animate-ping opacity-75"
      style={{
        top: `${Math.random() * 70}vh`,
        left: `${Math.random() * 95}vw`,
        fontSize: `${Math.random() * 1.5}rem` /*size*/,
        animationDuration: `${Math.random() * 12 + 1.1}s` /*how long star should stay*/,
      }}
    />
));
  
function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setButtonState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPhone("");
    setButtonState("submitted");
  };

    return (
        <div
        style={{
          overflowY: "scroll",
          height: "100vh",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
            }}
            className="bg-custom-gradient"
      >
    <div
      style={{
        backgroundRepeat: "no-repeat",
        
        backgroundPosition: "right",
        height: "50rem",
        width: "50rem",
        padding: "0rem",
      }}
      className="p-10 md:p-0 bg-transparent"
    >
      <div
        className=" w-full flex justify-center items-center shadow-[0_2px_20px_rgba(0,0,0,0.5)] rounded-3xl md:rounded-none md:shadow-[0_0px_0px_rgba(0,0,0,0)]"
        style={{
          width: "87rem",
          marginTop: "4rem",
          marginLeft: "4rem",
          marginRight: "4rem",
            height: "39rem",
            backgroundRepeat: "no-repeat",
          backgroundPosition:"right",
          backgroundImage: `url(https://blush.design/api/download?shareUri=f44zabd-9DwNxPMs&c=Hair_0%7Ec38741-0.2%7Effc943_Skin_0%7Eecafa3-0.2%7Ef6cbc3&w=800&h=800&fm=png)`,
        }}
      >
        <div class="container"></div>
        <form
          className="w-[85%] md:w-full gap-[1rem] flex flex-col justify-center items-left py-20"
          onSubmit={handleSubmit}
          style={{ paddingBottom: "0rem", paddingTop: "0rem" }}
        >
          <h1 className="w-[20%] text-center z-[3] text-indigo-1000 font-semibold text-[2.5em] md:text-[2rem]">
            Contact Us
          </h1>
          <input
            className="input-with-icon placeholder-stone h-12 md:h-12  bg-opacity-45 w-80 sm:w-60 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input-with-icon placeholder-stone h-12 md:h-12 mt-5 bg-opacity-45 w-80 sm:w-60 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-with-icon placeholder-stone h-12 md:h-12 mt-5 bg-opacity-45 w-80 sm:w-60 px-4 py-2 items-center outline-0 border-b-2 border-blue-800 text-black text-lg bg-white shadow-dashBoardCardImageShadow"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div
            className="w-screen relative h-20 flex justify-left "
            style={{ padding: "7px", marginBottom: "2rem" }}
          >
            <ReactiveButton
              style={customButtonStyle}
              buttonState={state}
              idleText="Send Message"
              type="submit"
            />
          </div>
        </form>
      </div>
     </div>
       </div>
  );
}
export default ContactPage;
