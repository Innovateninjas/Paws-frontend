import React from 'react';
import styles from "./Donation.module.css";

function Donation() {
  // Function to handle donation button click
  const handleDonate = (amount) => {
    // Replace 'your_upi_id' with your actual UPI ID
    const upiLink = `upi://pay?pa=rishipaulstudy@okhdfcbank&pn=Rishi%20Paul&am=${amount}&cu=INR`;
    window.location.href = upiLink;
  };

  return (
    <div>
      <div className={styles.masterContain}>
        <div className={styles.imgContainer}>
          <img src="./images/Donation.png" alt='' />
          <h2 className={styles.heading}> <span className={styles.someThing}>HELP US BRIGHTEN THEIR LIVES!</span></h2>
        </div>
        <div className={styles.main}>
          <p className={styles.p}>Your generous donations play a crucial role in caring for our little friends and helping them find their forever homes.</p>
          <div className={styles.makeDonation}>
            <div className={styles.mainbtn}>
              {/* On button click, call handleDonate function with the corresponding amount */}
              <button onClick={() => handleDonate(100)}>100 rupees</button>
              <button onClick={() => handleDonate(250)}>250 rupees</button>
              <button onClick={() => handleDonate(500)}>500 rupees</button>
            </div>
            <h2>OR</h2>
            <label className={styles.amt} htmlFor="password">Custom Amount</label>
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

export default Donation;
