import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FaUser, FaUserPlus, FaHome, FaSignOutAlt, FaDonate } from 'react-icons/fa'; // Import FaHeart icon
import styles from './Navbar.module.css';

const Navbar = () => {
  const csrftoken = localStorage.getItem('csrftoken');
  const [value, setValue] = React.useState(0);

  return (
    <nav className={styles.navbar}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {csrftoken ? (
          [
            <BottomNavigationAction key="profile" component={Link} to="/user" icon={<FaUser size={24} />} />,
            <BottomNavigationAction key="home" component={Link} to="/" icon={<FaHome size={24} />} />,
            <BottomNavigationAction key="donation" component={Link} to="/donation" icon={<FaDonate size={24} />} />, 
            <BottomNavigationAction key="logout" component={Link} to="/logout" icon={<FaSignOutAlt size={24} />} />
          ]
        ) : (
          <div className={styles.wrapper}>
            <BottomNavigationAction key="register" showLabel label="Register" component={Link} to="/register" icon={<FaUserPlus size={24} />} />
            <BottomNavigationAction key="login" showLabel label="Login" component={Link} to="/login" icon={<FaUser size={24} />} />
          </div>
        )}
      </BottomNavigation>
    </nav>
  );
};

export default Navbar;
