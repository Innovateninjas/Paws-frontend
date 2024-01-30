import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi'; // Import icons from React Icons
import ProfileIcon from '../ProfileComponent/ProfileIcon';
import styles from './UserPage.module.css';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom'; // Import at the top of your file

// ...

// ...
function UserPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const csrftoken = localStorage.getItem('csrftoken');
    const fetchData = async () => {
      try {
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
  const csrftoken = localStorage.getItem('csrftoken');
  if (!csrftoken){
    return <h1>You Need to login first</h1>
  }

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
        <p>
        <Link to="/view-reports">View Reports</Link> {/* Add this line */}
        </p>
      </div>
    </div>
  );
}

export default UserPage;
