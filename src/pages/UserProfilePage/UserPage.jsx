import React, { useEffect, useState, useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiDollarSign, FiAward,FiActivity } from 'react-icons/fi';

import styles from './UserPage.module.css';
import Loader from '../../Components/loader/loader';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function UserPage() {
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext);
  const profileIconSource = "./images/profile_icon.png";

  function ProfileIcon({ style }) {
    return <img src={profileIconSource} style={style} alt="Profile Icon"/>;
  }
  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);
  useEffect(() => {
    console.log(userDetails); // log userDetails to the console
  }, [userDetails]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <Loader visible />;
  }
  if (userDetails) {
    return (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className="wrap">
            {/* Profile picture */}
            <div className={styles.profilepic}><ProfileIcon style={{ marginLeft: '-100px',marginTop: '20px',boxShadow: '3px 3px 5px 6px gray', border: '1.5px solid gray', borderRadius: '50%', width: '250px', height: '250px' }} /></div>        
            </div>
        </div>
        <div className={styles.userDetails}>
        <div className={styles.userDetailsContainer}>
        <p className={styles.username}><FiUser /> <span className={styles.name}>{userDetails.name}</span></p>
            <p className={styles.email}><FiMail /> <span className={styles.email}>{userDetails.email}</span></p>
            <p className={styles.phone}><FiPhone /> <span className={styles.phone}>{userDetails.phone_number}</span></p>
            
          
          {/* There are more details about the user present in userDetail object console log to seen them and show them in the ui  */}
          <div>
          <p className={styles.levels}><FiAward /> <span className={styles.level}>Level: {userDetails.level}</span></p>
          <progress value={userDetails.level} max="100" style={{
            width: '100%',
            height: '20px',
            color: 'black',
            backgroundColor: '#f3f3f3',
            borderRadius: '10px',
            border:'1px solid black' }}></progress>
          </div>
          <p className={styles.phone}><FiActivity /> <span className={styles.phone}>No of Reports: {userDetails.no_reports}</span></p>
          
          {/* User Coins */}
          <p className={styles.coins} style={{ color: '#D4AF37' }}><FiDollarSign /> <span className={styles.coins}style={{ color: '#D4AF37' }}>Coins: {userDetails.coins}</span></p>
          <button className={styles.button} style={{ marginTop: '30px' }}>
          <Link to="/view-reports">My Reports</Link>
        </button>
        <button className={styles.button}>
          <Link to="/logout">Logout</Link>
        </button>
          <br />
        </div>
      </div>
      </div>
    );
  }
}
export default UserPage;