import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ProfileIcon.module.css';

const ProfileIcon = ({ top, right, bottom, left, borderVisible, position }) => {
    const positionStyle = {
        position: position || 'relative', // Use 'relative' by default if no position prop is provided
        width: '65px',
        height: '65px',
        zIndex: 1,
        top: top ? top : 'auto',
        right: right ? right : 'auto',
        bottom: bottom || 'auto',
        left: left || '50%',
        transform: 'translate(-50%, -50%)',
        border: borderVisible ? '1px solid black' : 'none', // Apply border if borderVisible is true
        borderRadius: borderVisible ? '50%' : '0', // Apply border-radius to make it a circle if borderVisible is true
    };

    return (
        <Link to="/user" style={positionStyle}>
            <img className={styles.profileIcon} src="./images/profile_icon.png" alt="profile icon" />
        </Link>
    );
};

// Define PropTypes for the component
ProfileIcon.propTypes = {
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    borderVisible: PropTypes.bool, // Prop for controlling border visibility
    position: PropTypes.string, // Prop for setting position (default: 'relative')
};

// Set default props
ProfileIcon.defaultProps = {
    borderVisible: false, // Default border visibility is false
    position: 'relative', // Default position is 'relative'
};

export default ProfileIcon;
