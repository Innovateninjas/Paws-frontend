import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi'; // Import icons from React Icons
import ProfileIcon from '../ProfileComponent/ProfileIcon';
import styles from './UserPage.module.css';
import Loader from '../loader/loader';

function UserPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrftoken = localStorage.getItem('csrftoken');
        const response = await axios.get('https://aniresfr-backend.vercel.app/user', {
          headers: {
            'Authorization': `Token ${csrftoken}`,
          },
          withCredentials: true
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <Loader/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className="wrap">
          <ProfileIcon top={"20%"} borderVisible position={'absolute'} />
        </div>
      </div>
      <div className={styles.userDetails}>
        {/* Icon for Name */}
        <p><FiUser /> <span className={styles.name}>{userData.first_name}</span></p>
        {/* Icon for Email */}
        <p><FiMail /> <span className={styles.email}>{userData.username}</span></p>
        {/* Icon for Phone */}
        <p><FiPhone /> <span className={styles.phone}>{userData.last_name}</span></p>
      </div>
    </div>
  );
}

export default UserPage;
