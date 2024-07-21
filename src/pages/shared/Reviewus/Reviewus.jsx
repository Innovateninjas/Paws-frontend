import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../../Components/user/SkeletonLoaders/CampaignList";
import axios from "axios";
import Background from "../../../Components/shared/Background";

const Reviewus = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL;
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Background />
      {!isLoading && (
        <>
          <div className="flex flex-col items-center font-breeSerif justify-center gap-[30px] mb-[70px] w-screen ">
            <h1 className="text-center mt-[40px] pb-1 z-[3] text-[#40025D] font-extrabold tracking-widest text-4xl drop-shadow-xl flex flex-col">
              <span className="mb-[5px]">Review Us</span>
              <span> Drop in your review!</span>
            </h1>
            <div className="mt-[-15px] pb-1 z-[3] text-[#40025D] font-bold tracking-widest text-xl drop-shadow-xl flex flex-col">
              <form action="" method="POST">
                {/* add formspree link linked with your mail here to get the responses */}
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="name" className="text-[#40025D] font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="p-[10px] border-[2px] border-[#40025D] rounded-[10px] w-96"
                    placeholder="Your name"
                  />
                  <label htmlFor="email" className="text-[#40025D] font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="p-[10px] border-[2px] border-[#40025D] rounded-[10px]"
                    placeholder="Your email"
                  />
                  <label htmlFor="review" className="text-[#40025D] font-bold">
                    Review
                  </label>
                  <input
                    type="text"
                    name="review"
                    id="review"
                    className="p-[20px] border-[2px] border-[#40025D] rounded-[10px] h-32"
                    placeholder="Write your review here"
                  />
                </div>
              <button className="border-[2px] m-6 bg-cyan-800 p-2 text-white w-80">Submit</button>
              </form>
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <>
          <div className="flex flex-col gap-[15px] justify-center items-center my-[45px]">
            <Skeleton width="calc(100vw - 40px)" height={150} />
            <Skeleton width="calc(100vw - 60px)" height={120} />
            <Skeleton width="calc(100vw - 60px)" height={120} />
            <Skeleton width="calc(100vw - 60px)" height={120} />
            <Skeleton width="calc(100vw - 60px)" height={120} />
            <Skeleton width="calc(100vw - 60px)" height={120} />
          </div>
        </>
      )}
    </>
  );
};

export default Reviewus;
