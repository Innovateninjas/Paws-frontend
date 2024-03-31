import React, { useState, useEffect } from "react";
import styles from "./campaignList.module.css";
import { Link } from "react-router-dom";
import Skeleton from "..//..//..//Components/Skeletons/campList";
import axios from "axios";
import Background from "../../../Components/backgroundComponent/Background";
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
        <div className="flex flex-col items-center justify-center gap-[20px] mb-[60px] w-screen ">
          <h1 className="text-center mt-[30px] pb-1 z-[3] text-[#40025D] font-bold tracking-wide text-[2em] ">
            Volunteer Now,<br></br> Make Your Mark!</h1>
          <div className={styles.masterContainer}>
          {data.map((item, index) => (
            <div key={index} className="flex justify-center w-screen">
            <div  className=" py-[15px] px-[20px] w-[90%] flex flex-col gap-[10px] rounded-3xl shadow-dashBoardCardImageShadow bg-[#ffffff66]  backdrop-blur-[5px] mb-[20px]">
              <div className="flex flex-col gap-4">
                <p className="font-bold p-2 tracking-wide text-[1.3rem] text-[#0b0553de]">{item.title}</p>
                {/* DURATION */}
                <div className="flex flex-col gap-2">
                <small className="text-[#092817] font-medium text-[16px]">Duration: {(new Date(item.end_date.split('T')[0])- new Date(item.start_date.split('T')[0]))/ (1000 * 60 * 60 * 24)} Days</small>
                {/* DESCRIPTION */}
                <p className="text-[16px] font-medium">{item.description.slice(0,100)} <Link to={`/campaignBlog/${item.campaign_id}`} className="font-medium underline text-[#40025D]">Learn More...</Link>
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
        <div className={styles.skeltonContainer}>
        <Skeleton width="calc(100vw - 20px)" height={150} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
          <Skeleton width="calc(100vw - 40px)" height={100} />
        </div>
         
        </>
      )}
    </>
  );
};

export default Campaignlist;
