import React, { useState, useEffect } from "react";
import styles from "./campaignList.module.css";
import { Link } from "react-router-dom";
import Skeleton from "..//..//..//Components/Skeletons/campList";
import axios from "axios";
const Campaignlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://aniresfr-backend.vercel.app/api/campaigns"
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
      {!isLoading && (
        <>
          <h1 className={styles.heading}>
            Volunteer Now,<br></br> Make Your Mark!
          </h1>
          {data.map((item, index) => (
            <div key={index} className={styles.heroContainer}>
            <div  className={styles.conatiner}>
              <div className={styles.contents}>
                <p>{item.title}</p>
                {/* DURATION */}
                <small className={styles.smal}>Duration: {(new Date(item.end_date.split('T')[0])- new Date(item.start_date.split('T')[0]))/ (1000 * 60 * 60 * 24)} Days</small>
                <br />
                {/* <small className={styles.smal}>Roles: {item.tags}</small> */}
              </div>
              <div className={styles.butnContainer}>
                <Link to={`/campaignBlog/${index + 1}`} className={styles.btn}>
                  Apply
                </Link>
              </div>
            </div>
            </div>
          ))}
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
