import React, { useState, useEffect } from "react";
import Skeleton from "..//..//..//Components/Skeletons/campaign";
import { useParams } from "react-router-dom";
import styles from "./campaignBlog.module.css";
import axios from "axios";
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
        const response = await axios.get(
          `https://aniresfr-backend.vercel.app/api/campaigns/${campaignId}`
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
 
  
  return (
    <div>
      <>
        {!isLoading && (
          <>
            <h1 className={styles.heading}>{data.title}</h1>
            <small className={styles.organiser}>
              <i>
                Organised By- <u> {data.ngo_name}</u>
              </i>
            </small>
            <br />
            <h2 className={styles.head}>
                <i>Description:</i>
              </h2>
            <div className={styles.conatiner}>
              
              {data.description}
              <br />
              <br />
              <p className={styles.details}>

                  <li className={styles.listItem}>
                    <b> Campaign starts on: </b>

                    {data.start_date.split("T")[0]}
                  </li>
                  <li className={styles.listItem}>
                    <b> Last date for applications: </b>
                    {data.application_deadline.split("T")[0]}
                  </li>
                  <li className={styles.listItem}>
                    <b> Duration: </b>
                    {data.start_date.split("T")[0]} to
                    {data.end_date.split("T")[0]}
                  </li>
                  <li className={styles.listItem}>
                  Age Accessibility: <b>{ageAccess()}</b> 
                  </li>
              </p>
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
