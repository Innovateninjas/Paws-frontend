import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * ProfileIcon component to display a profile icon.
 * @param {object} props - The props of the ProfileIcon component.
 * @param {number|string} [props.top] - The top position of the icon. (Optional)
 * @param {number|string} [props.right] - The right position of the icon. (Optional)
 * @param {number|string} [props.bottom] - The bottom position of the icon. (Optional)
 * @param {number|string} [props.left] - The left position of the icon. (Optional)
 * @param {boolean} [props.borderVisible=false] - Whether to show a border around the icon. (Optional)
 * @param {string} [props.position='relative'] - The position of the icon. (Optional)
 * @returns {JSX.Element} ProfileIcon component.
 */
const ProfileIcon = ({ top, right, bottom, left, borderVisible, position }) => {
    const positionStyle = {
        position: 'absolute',
        width: '65px',
        height: '65px',
        zIndex: 10,
        top: top || 'auto',
        right: right || 'auto',
        bottom: bottom || 'auto',
        left: left || '50%',
        transform: 'translate(-50%, -50%)',
        border: borderVisible ? '1px solid black' : 'none',
        borderRadius: borderVisible ? '50%' : '0',
    };

    return (
        <Link to="/user" style={positionStyle}>
            <img className="w-16 h-16 z-10" src="./images/profile_icon.png" alt="profile icon" />
        </Link>
    );
};

ProfileIcon.propTypes = {
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    borderVisible: PropTypes.bool,
    position: PropTypes.string,
};

ProfileIcon.defaultProps = {
    borderVisible: false,
    position: 'relative',
};

export default ProfileIcon;
