import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './ProfileIcon.module.css'; // Make sure to adjust the path accordingly

const ProfileIcon = () => {
    return (
        <Link to="/user">
            <img className={styles.profileIcon} src="./images/profile_icon.png" alt="profile icon" />
        </Link>
    );
};

export default ProfileIcon;
