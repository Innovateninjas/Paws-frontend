import React, { useState , useEffect } from 'react';
import styles from './Donationfront.module.css';
import { Link } from 'react-router-dom';
//import { NgoContext } from "../../contexts/NgoContext";

export const Donationfront = () => {
  const [theme, setTheme] = useState({
    startColor: '#ff105f',
    endColor: '#ffad06',
  });
    const [donationType, setDonationType] = useState('us');
    const [showContent, setShowContent] = useState(true);
    const [ngoNames, setNgoNames] = useState([]);
  
    const handleToggleClick = (type) => {
      setDonationType(type);
      setShowContent(true);
      setTheme(type === 'us' ? { startColor: '#ff105f', endColor: '#ffad06' } : { startColor: '#00bcd4', endColor: '#ff5722' });
    };

    useEffect(() => {
      // Fetch NGO names from the server
      const fetchNgoNames = async () => {
        try {
          const response = await fetch('https://aniresfr-backend.vercel.app/ngo');
          if (response.ok) {
            const data = await response.json();
            console.log("ngo names :", data);
            setNgoNames(data); // Assuming the response is an array of strings
          } else {
            console.error('Failed to fetch NGO names');
          }
        } catch (error) {
          console.error('Error fetching NGO names:', error);
        }
      };
  
      fetchNgoNames();
    },[]);
    return (
      <div>
        <div className={styles.hero}>
          <div className={styles.formBox}>
            <div className={styles.boxbutton}>
            <div className={styles.buttonBox}>
              <div
                id='btn'
                className={styles.btn}
                style={{
                  background: `linear-gradient(to right, ${theme.startColor}, ${theme.endColor})`,
                }}
              ></div>
              <button
                type='button'
                className={`${styles.togglebtn} ${donationType === 'us' ? styles.active : ''}`}
                onClick={() => handleToggleClick('us')}
              >
                Donate to US
              </button>
              <button
                type='button'
                className={`${styles.togglebtn} ${donationType === 'ngo' ? styles.active : ''}`}
              onClick={() => handleToggleClick('ngo')}
              >
                Donate to NGO
              </button>
            </div>
            </div>
            {showContent && (
              <div className={donationType === 'us' ? styles.usText : styles.ngoText}>
                <p className={styles.paragraph}>
                  {donationType === 'us' ? 'Donate to us' : 'Donate to your CHOICE OF NGO'}
                  <br />
                  {donationType === 'us' && 'To help us save our little friends!'}
                </p>
                {donationType === 'ngo' && (
                  <select>
                     <option>Choose an NGO</option>
                  {ngoNames.map((ngoName, index) => (
                    <option key={index} value={ngoName}>
                      {ngoName}
                    </option>
                  ))}
                  </select>
                 )}
                  {/* fetch the ngo name list from the backend in the above function  */}
                <div className={styles.donateBtn}>
                  <button
                    type='submit'
                    className= {styles.submitbtn}
                  > <Link className={styles.lin} to="/donation">Donate</Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };