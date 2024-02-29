import React, { useState, useEffect } from "react";
import styles from "./volunteer.module.css";
import { Link } from 'react-router-dom';

const Volunteer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [duration, setDuration] = useState(); // State for duration
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://aniresfr-backend.vercel.app/api/campaigns"
          );
          const dataJson = await response.json();
          console.log(dataJson);
          setData(dataJson);
          setIsLoading(false);
  
          // Calculate duration after data is fetched
          const startdate = new Date(dataJson.start_date);
          const enddate = new Date(dataJson.end_date);
          const days = (enddate.getTime() - startdate.getTime()) / (1000 * 3600 * 24);
          console.log(startdate.getDate())
          setDuration(days); 
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
          <h1 className={styles.heading}>Volunteer Now,<br></br> Make Your Mark!</h1>
            {data.map((item, index) => (
              <div key={index} className={styles.conatiner}>
                <div className={styles.contents}>
                  <p>{item.title}</p>
                  <small className={styles.smal}>Duration: {duration} Days</small>
                  <br />
                  {/* <small className={styles.smal}>Roles: {item.tags}</small> */}
                </div>
                <div className={styles.butnContainer}>
                  <Link to={`/blog/${index+1}`} className={styles.btn}>
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </>
      
    );
  };
  
  export default Volunteer;
  