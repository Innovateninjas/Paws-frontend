import React, { useEffect, useState, useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiDollarSign, FiAward,FiActivity } from 'react-icons/fi';

import styles from './UserPage.module.css';
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

  if (loading) {
    return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center text-center w-full h-full">
        <div role="status">
            <svg aria-hidden="true" class="inline w-48 h-48 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    );
  }
  
  if (error) {
    return <h1>{error}</h1>;
  }
  if (userDetails) {
    return (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className="wrap">
            {/* Profile picture */}
            <div className={styles.profilepic}><ProfileIcon style={{ margin: 'auto',marginTop: '20px',boxShadow: '1px 2px 2px black', borderRadius: '50%', width: '250px', height: '250px', objectFit: 'cover', border:'5px ridge black' }} /></div>        
            </div>
        </div>
        <div className={styles.userDetails}>
        <div className={styles.userDetailsContainer}>
        <p className={styles.username}><FiUser /> <span className={styles.name}>{userDetails.name}</span></p>
            <p className={styles.email}><FiMail fontSize='22px' />{userDetails.email}</p>
            <p className={styles.phone}><FiPhone /> <span className={styles.phone}>{userDetails.phone_number}</span></p>
            
          
          {/* There are more details about the user present in userDetail object console log to seen them and show them in the ui  */}
          <div>
          <p className={styles.levels}><FiAward /> <span className={styles.level}>Level: {userDetails.level}</span></p>
          <progress value={userDetails.level} max="100" style={{
            width: '100%',
            height: '20px',
            color: 'black',
            backgroundColor: '#f3f3f3',
            overflow:'hidden',
            borderRadius: '10px',
            border:'1px solid black' }}></progress>
          </div>
          <p className={styles.phone}><FiActivity /> <span className={styles.phone}>No of Reports: {userDetails.no_reports}</span></p>
          
          {/* User Coins */}
          <p className={styles.coins} style={{ color: '#DFC200' }}><FiDollarSign /> <span className={styles.coins}style={{ color: '#DFC200' }}>Coins: {userDetails.coins}</span></p>

         
          <br />
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.button}>
          <Link to="/view-reports">My Reports</Link>
        </button>
        <button className={styles.button}>
          <Link to="/logout">Logout</Link>
        </button>
         </div>
      </div>
      </div>
    );
  }
}
export default UserPage;