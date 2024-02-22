// SuccessPage.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./SuccessPage.module.css";

function SuccessPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Success</h2>
      <div className={styles.checkmark}>✓</div>
      <p className={styles.message}>Your report has been successfully submitted!</p>
      <div className={styles.buttons}>
        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
        <Link to="/view-reports" className={styles.button}>
          View Reports
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
