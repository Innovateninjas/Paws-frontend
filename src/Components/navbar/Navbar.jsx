import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FaUser, FaUserPlus, FaHome, FaSignOutAlt } from 'react-icons/fa'; // Import FaUser, FaUserPlus, FaHome, and FaSignOutAlt icons from React Icons
import styles from './Navbar.module.css'; // Import CSS module styles

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
        showLabels // Added to display labels below icons
      >
        {csrftoken ? (
          <>
            <BottomNavigationAction label="Profile" component={Link} to="/user" icon={<FaUser size={24} />} />
            <BottomNavigationAction label="Home" component={Link} to="/" icon={<FaHome size={24} />} />
            <BottomNavigationAction label="Logout" component={Link} to="/logout" icon={<FaSignOutAlt size={24} />} />
          </>
        ) : (
          <>
            <div className={styles.wrapper}>

              <div className={styles.wrap}>

                <BottomNavigationAction
                  component={Link}
                  to="/register"
                    icon={<FaUserPlus size={24} />}
                />
                <span className={styles.label}>Register</span>
              </div>
              <div className={styles.wrap}>

                <BottomNavigationAction
                  component={Link}
                  to="/login"
                    icon={<FaUser size={24} />}
                />
                <span className={styles.label}>Login</span>
              </div>
            </div>
          </>
        )}
      </BottomNavigation>
    </nav>
  );
};

export default Navbar;
