import React, { useState, useEffect } from "react";
import styles from "./campaignList.module.css";
import { Link } from "react-router-dom";
import Skeleton from "..//..//..//Components/Skeletons/campList";

const Campaignlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://aniresfr-backend.vercel.app/api/campaigns"
        );
        const dataJson = await response.json();
        // console.log(dataJson);
        setData(dataJson);
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
            <div key={index} className={styles.conatiner}>
              <div className={styles.contents}>
                <p>{item.title}</p>
                {/* DURATION */}
                <small className={styles.smal}>Duration: {(new Date(item.end_date.split('T')[0])- new Date(item.start_date.split('T')[0]))/ (1000 * 60 * 60 * 24)} Days</small>
                <br />
                {/* <small className={styles.smal}>Roles: {item.tags}</small> */}
              </div>
              <div className={styles.butnContainer}>
                <Link to={`/campaignBlog/${index + 1}`} className={styles.btn}>
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
      {isLoading && (
        <>
          <Skeleton width={390} height={150} />
          <Skeleton width={380} height={85} />
          <Skeleton width={380} height={85} />
          <Skeleton width={380} height={85} />
          <Skeleton width={380} height={85} />
          <Skeleton width={380} height={85} />
          <Skeleton width={380} height={85} />
          <Skeleton width={380} height={85} />
        </>
      )}
    </>
  );
};

export default Campaignlist;
