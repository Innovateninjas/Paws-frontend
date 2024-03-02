import React, { useEffect, useState, useContext } from 'react';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import ProfileIcon from '../../Components/ProfileComponent/ProfileIcon';
import styles from './UserPage.module.css';
import Loader from '../../Components/loader/loader';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function UserPage() {
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext)
  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData)
    }
  }, [userData, loading, error]);

  if (error) {
    return <h1>{error}</h1>
  }

  if (loading) {
    return <Loader visible />;
  }
  if (userDetails) {
    return (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className="wrap">
            <ProfileIcon top={"20%"} borderVisible position={'absolute'} />
          </div>
        </div>
        <div className={styles.userDetails}>
          {/* Icon for Name */}
          <p><FiUser /> <span className={styles.name}>{userDetails.name}</span></p>
          {/* Icon for Email */}
          <p><FiMail /> <span className={styles.email}>{userDetails.email}</span></p>
          {/* Icon for Phone */}
          <p><FiPhone /> <span className={styles.phone}>{userDetails.phone_number}</span></p>
          {/* There are more details about the user present in userDetail object console log to seen them and show them in the ui  */}
          <p>

            <Link to="/view-reports">View Reports</Link> {/* Add this line */}
          </p>
          <br />
          <p>level,coins, no of reports ,logout and more to add here </p>
        </div>
      </div>
    );
  }
}

export default UserPage;
