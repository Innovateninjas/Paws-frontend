import React from 'react';
import styles from './ProfileIcon.module.css'; // Make sure to adjust the path accordingly

const ProfileIcon = () => {
    return (
        <img className={styles.profileIcon} src="./images/profile_icon.png" alt="profile icon" />
    );
};

export default ProfileIcon;
