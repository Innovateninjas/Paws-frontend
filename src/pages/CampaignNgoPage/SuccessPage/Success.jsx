import React from "react";
import styles from "./success.module.css"
const Success = () => {
  return (
    <div className={styles.okok}>
      <h1>
        <div className={styles.container}>
        Campaign Created <br /> <span className={styles.span}>Successfully!</span> 
        </div>
        <button className={styles.btn}>Back to DashBoard</button>
      </h1>
    </div>
  );
};

export default Success;
