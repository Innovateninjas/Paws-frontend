import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import preloaderAnimation from "./preloader.json";
import "./preloader.css";

const Preloader = () => {
  const [fadeIn, setFadeIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setFadeIn(false);
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoading(false);
    }, 1700);

    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${fadeIn ? "fade-in" : "fade-out"}`}>
      <Lottie className="preloader-animation" animationData={preloaderAnimation} />
    </div>
  );
};

export default Preloader;