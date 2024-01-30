import React, { useState, useEffect } from 'react';
import styles from "./Donation.module.css";

function Donation() {
  return (
    <div>

      <div className={styles.contain}>
        <h2 className={styles.heading}>HELP US TO HELP OUR LITTLE FRIENDS!</h2>
        <p>Your donations will help us take care of our little friends and help them find their next life-long home</p>
        <div className={styles.butt}>
          <div className={styles.mainbtn}>
            <button >10 rupees</button>
            <button >25 rupees</button>
            <button >50 rupees</button>
          </div>
          <h2>OR</h2>
          <label for="password">Custom Amount :</label>
          <div className={styles.gap}>
            <input type="text" id="amount" name="rupees" placeholder="Enter custom amount" required></input>
          </div>
          <div className={styles.donatebtn}>
            <button className={styles.dont}>Donate now!</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Donation