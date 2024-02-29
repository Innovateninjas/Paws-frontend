import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./blog.module.css";
const Blog = () => {
  const [id, setId] = useState();
  const { campaignId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [tag, setTag] = useState();
  let allTag = null;
  console.log(campaignId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://aniresfr-backend.vercel.app/api/campaigns/${campaignId}`
        );
        const dataJson = await response.json();

        setId(campaignId);
        setIsLoading(false);
        setData(dataJson);
        setTag(dataJson.tags);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (tag) {
      allTag = tag.map((item, index) => (allTag = allTag + item + ","));
    }

    console.log(allTag);
    // console.log(data.tags);
    fetchData();
  }, []);

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
                <i>Description:</i>{" "}
              </h2>
            <div className={styles.conatiner}>
              
              {data.description}
              <br />
              <br />
              <p className={styles.details}>
                <ul className={styles.ulist}>
                  <li className={styles.listItem}>
                    <b> Campaign starts on: </b>

                    {data.start_date.split("T")[0]}
                  </li>
                  <li className={styles.listItem}>
                    <b> Last date for applications: </b>
                    {data.application_deadline.split("T")[0]}{" "}
                  </li>
                  <li className={styles.listItem}>
                    <b> Duration: </b>
                    {data.start_date.split("T")[0]} to{" "}
                    {data.end_date.split("T")[0]}{" "}
                  </li>
                  <li className={styles.listItem}>
                    Open to all ages, especially <b>{data.age_group}</b> and up
                  </li>
                  {/* <li className={styles.listItem}>
                    <b>Key Roles: </b>
                    <ul>
                      {allTag.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </li> */}
                </ul>
              </p>
              <br />
              <p className={styles.details}>
                For inquiries, contact us: <i>{data.phone_number}</i> or{" "}
                <i>{data.email} </i>.{" "}
              </p>

              <img className={styles.imageStyle} src={data.image_link} alt="" />
              <br />
              <p className={styles.tagContainer}>
                {data.tags &&
                  data.tags.map((item, index) => (
                    <span className={styles.tag} key={index}>
                      {item} <br></br>{" "}
                    </span>
                  ))}
              </p>
              <button className={styles.btn}>Apply</button>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Blog;
