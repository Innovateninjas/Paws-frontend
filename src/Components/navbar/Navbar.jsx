import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FaUser, FaUserPlus, FaHome, FaDonate } from 'react-icons/fa';
import styles from './Navbar.module.css';
import { MdPeople, MdCampaign } from 'react-icons/md';
import { ImStatsBars } from "react-icons/im";
import { TbReportSearch } from "react-icons/tb";

const Navbar = () => {
  const csrftoken = localStorage.getItem('csrftoken');
  const userType = localStorage.getItem('userType');
  const [value, setValue] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      const isAlwaysVisiblePage = [
        '/user',
        '/donation',
        '/',
        '/report-incident',
        '/stats',
        '/createcampaign',
        '/ngoProfile',
        '/dashboard',
        '/login',
        '/register'
      ].includes(location.pathname);

      setShowNavbar(isAlwaysVisiblePage || !isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Update the value state when location changes
  useEffect(() => {
    const paths = ['/', '/user', '/donation', '/campaignList'];
    setValue(paths.indexOf(location.pathname));
  }, [location.pathname]);

  return showNavbar ? (
    <nav className={styles.navbar}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {csrftoken && userType === "user" ? (
          [
            <BottomNavigationAction key="home" component={Link} to="/" icon={<FaHome size={24} />} />,
            <BottomNavigationAction key="profile" component={Link} to="/user" icon={<FaUser size={24} />} />,
            <BottomNavigationAction key="donation" component={Link} to="/donationfront" icon={<FaDonate size={24} />} />,
            <BottomNavigationAction key="campaignList" component={Link} to="/campaignList" icon={<MdPeople size={24} />} />,
          ]
        ) : csrftoken && userType === "ngo" ? (
          [
            <BottomNavigationAction key="stats" component={Link} to="/stats" icon={<ImStatsBars size={24} />} />,
            <BottomNavigationAction key="reports" component={Link} to="/dashboard" icon={<TbReportSearch size={24} />} />,
            <BottomNavigationAction key="createcampaign" component={Link} to="/createcampaign" icon={<MdCampaign size={24} />} />,
            <BottomNavigationAction key="ngoprofile" component={Link} to="/ngoProfile" icon={<FaUser size={24} />} />,
          ]
        )
          : (
            [
              <BottomNavigationAction key="register" showLabel label="Register" component={Link} to="/register" icon={<FaUserPlus size={24} />} />,
              <BottomNavigationAction key="login" showLabel label="Login" component={Link} to="/login" icon={<FaUser size={24} />} />,
            ]
          )}
      </BottomNavigation>
    </nav>
  ) : null;
};

export default Navbar;
