import React, { useEffect, useState, useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiDollarSign, FiAward } from 'react-icons/fi';
import ProfileIcon from '../../Components/ProfileComponent/ProfileIcon';
import styles from './UserPage.module.css';
import Loader from '../../Components/loader/loader';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function UserPage() {
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext);
  
  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);

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
            <div className={styles.profilepic}><ProfileIcon /></div>        
            {/* Display name and email below the profile picture */}
            <p className={styles.username}><FiUser /> <span className={styles.name}>{userDetails.name}</span></p>
            <p className={styles.email}><FiMail /> <span className={styles.email}>{userDetails.email}</span></p>
            <p className={styles.phone}><FiPhone /> <span className={styles.phone}>{userDetails.phone_number}</span></p>
          </div>
        </div>
        <div className={styles.userDetails}>
          {/* Icon for Phone */}
          
          {/* There are more details about the user present in userDetail object console log to seen them and show them in the ui  */}
          <p className={styles.levels}><FiAward /> <span className={styles.level}>Level: {userDetails.level}</span></p>
          {/* User Coins */}
          <p className={styles.coins}><FiDollarSign /> <span className={styles.coins}>Coins: {userDetails.coins}</span></p>
          <button className={styles.button}>
          <Link to="/view-reports">My Reports</Link>
        </button>
        <button className={styles.button}>
          <Link to="/logout">Logout</Link>
        </button>
          <br />
        </div>
      </div>
    );
  }
}

export default UserPage;
