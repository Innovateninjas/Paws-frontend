import React, { useState, useEffect } from 'react';
import styles from "./Donation.module.css";

function Donation() {
  return (
    <div>
      <div className={styles.masterContain}>

      <div><img src="./images/Donation.png" alt=''></img>
      <h2 className={styles.heading}> <span className={styles.someThing}>HELP US BRIGHTEN THEIR LIVES!</span></h2></div>
       
        <div className={styles.main}>

        <p className={styles.p}>Your generous donations play a crucial role in caring for our little friends and helping them find their forever homes.</p>
        
        <div className={styles.makeDonation}>
          <div className={styles.mainbtn}>
            <button >100 rupees</button>
            <button >250 rupees</button>
            <button >500 rupees</button>
          </div>
          <h2>OR</h2>
          <label className={styles.amt} for="password">Custom Amount</label>
          <div className={styles.gap}>
            <input type="number" id="amount" name="rupees" placeholder="Enter custom amount..." required></input>
          </div>
          <div className={styles.donatebtn}>
            <button className={styles.dont}>Donate now!</button>
          </div>
        </div>

        </div>
       
      </div>

    </div>
  );

}

export default Donation