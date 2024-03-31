import React, { useState, useEffect } from "react";
import Skeleton from "..//..//..//Components/Skeletons/campaign";
import { useParams } from "react-router-dom";
import styles from "./campaignBlog.module.css";
import axios from "axios";
import Background from "../../../Components/backgroundComponent/Background";
import { format } from 'date-fns';
const CampaignBlog = () => {
  // const [id, setId] = useState();
  const { campaignId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [age, setAge] = useState();
  // console.log(campaignId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(
          `${url}/api/campaigns/${campaignId}`
        );

        // Extract data from the response
        const dataJson = response.data;

        // setId(campaignId);
        setIsLoading(false);
        setData(dataJson);
        setAge(dataJson.age_group);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

   
    fetchData();
  }, [campaignId]);
  
  const ageAccess=()=>{
    if(age===0){
      return "Open to All Age Groups";
        }
        else{
          return (age+ "+");
        }
  }
  // bg-gradient-to-b from-[rgba(222,221,255,0.68)] to-[rgba(205,254,207,0.68)] via-[rgba(110,255,117,0.68)] border border-black border-opacity-100 shadow-xl blur-[33.93px]
  return (
    <div>
      <>
        {!isLoading && (
          <>
          <Background />
          <h1 className="bg-gradient-to-b from-[rgba(175,255,171,0.68)] to-[rgba(29,239,36,0.68)] via-[rgba(110,255,117,0.68)] text-center font-breeSerif text-[#0B0553] text-3xl drop-shadow-xl font-bold rounded-[30px] shadow-dashBoardCardImageShadow p-2 w-80 mx-auto mt-5 mb-5">{data.title}</h1>
            {/* <h1 className={styles.heading}>{data.title}</h1> */}
            <small className="text-[#0B0553] font-bold float-right text-sm">
              <i>
                Organised By- <u> {data.ngo_name}</u>
              </i>
            </small>
            <br />
            <div className=" py-[8px] px-[15px] w-[95vw] flex flex-col rounded-3xl shadow-dashBoardCardImageShadow bg-[#ffffff66]  backdrop-blur-[5px] mb-[20px] m-auto">
            <h2 className="p-[10px]">
                <i>Description:</i>
              </h2>
            <div className="max-w-full px-3 flex flex-col items-center text-left justify-center overflow-x-hidden mb-20">
              {data.description}
              {/* LIST CONTAINER */}
                  <div className="flex mt-[5px] flex-col gap-[2px]">
                  <li className="list-none">
                    <b> Campaign starts on: </b>

                    {data.start_date.split("T")[0]}
                  </li>
                  <li className="list-none">
                    <b> Last date for applications: </b>
                    {data.application_deadline.split("T")[0]}
                  </li>
                  <li className="list-none">
                    <b> Duration: </b>
                    {data.start_date.split("T")[0]} to
                    {data.end_date.split("T")[0]}
                  </li>
                  <li className="list-none">
                  <b className="mr-[5px]">  Age Accessibility:</b>{ageAccess()} 
                  </li>
              
              </div>
              <br />
              <p className={styles.details}>
                For inquiries, contact us: <i> <u>{data.phone_number}</u> </i> or<i> <u>{data.email}</u>  </i>
              </p>

              <img className={styles.imageStyle} src={data.image_link} alt="" />
              <br />
              <p className={styles.tagContainer}>
                {data.tags &&
                  data.tags.map((item, index) => (
                    <span className={styles.tag} key={index}>
                      {item} <br></br>
                    </span>
                  ))}
              </p>
              <button className={styles.btn}>Show Interest</button>
            </div>
            </div>
          </>
        )}
        {isLoading &&(
          <div className={styles.skeltonContainer}>
          <Skeleton  width={370} height={120}/>
          </div>

        )}
      </>
    </div>
  );
};

export default CampaignBlog;
