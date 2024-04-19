import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../../Components/user/SkeletonLoaders/CampaignList";
import axios from "axios";
import Background from "../../../Components/shared/Background";
const Campaignlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(
          `${url}/api/campaigns`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Background/>
      {!isLoading && (
        <>
        <div className="flex flex-col items-center font-breeSerif justify-center gap-[30px] mb-[70px] w-screen ">
          <h1 className="text-center mt-[40px] pb-1 z-[3] text-[#40025D] font-extrabold tracking-widest text-4xl drop-shadow-xl flex flex-col">
           <span className="mb-[5px]">Volunteer Now,</span><span> Make Your Mark!</span></h1>
          <div>
          {data.map((item, index) => (
            <div key={index} className="flex justify-center w-screen">
            <div  className=" py-[8px] px-[15px] w-[90%] flex flex-col rounded-3xl shadow-dashBoardCardImageShadow bg-[#ffffff88]  backdrop-blur-[5px] mb-[20px]">
              <div className="flex flex-col gap-[10px]">
              {/* TITLE */}
                <p className="font-bold drop-shadow-md tracking-wide text-[1.3rem] text-[#0b0553de]">{item.title}</p>
                {/* DURATION */}
                <div className="flex flex-col gap-1">
                <small className="text-[#0b4626ad] drop-shadow-md font-medium text-[16px]">Duration: {(new Date(item.end_date.split('T')[0])- new Date(item.start_date.split('T')[0]))/ (1000 * 60 * 60 * 24)} Days</small>
                {/* DESCRIPTION */}
                <p className="text-[16px] font-medium">{item.description.slice(0,100)} <Link to={`/campaignBlog/${item.campaign_id}`} className="font-medium ml-1 underline text-[#40025D]"> Learn More...</Link>
                {/* LINK */}
                 </p> 
                 </div>
              </div>
            </div>
            </div>
          ))}
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

export default Campaignlist;
