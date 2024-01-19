// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation if you're using React Router

const Navbar = () => {
  const csrftoken = localStorage.getItem('csrftoken');
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
       {csrftoken ? (
        <>
          <li style={styles.navItem}><Link to="/user">User Info</Link></li>
          <li style={styles.navItem}><Link to="/logout">Logout</Link></li>
        </>
        ) : (
          <>
            <li style={styles.navItem}><Link to="/register">Register</Link></li>
            <li style={styles.navItem}><Link to="/login">Login</Link></li>
          </>
        )}
        <li style={styles.navItem}><Link to="/report-incident">Report</Link></li>
        <li style={styles.navItem}><Link to="/blog">Blogs</Link></li>
        <li style={styles.navItem}><Link to="/general">General</Link></li>
        <li style={styles.navItem}><Link to="/view-reports">View Reports</Link></li>
        <li style={styles.navItem}><Link to="/view-reports">View Reports</Link></li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'red',
    padding: '10px',
    zIndex: 1000,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: 0,
    padding: 0,
  },
};

export default Navbar;
