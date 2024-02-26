import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleStatusChange } from '../../Components/utils/Functions/statusUpdater';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [statusOptions] = useState(['Received', 'In Progress', 'Rescued']);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://aniresfr-backend.vercel.app/api/animals');
        const data = await response.json();
        // Add 'expanded' property to each report object
        const updatedReports = data.map((report) => ({
          ...report,
          expanded: false,
        }));
        setReports(updatedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    // Fetch reports initially
    fetchReports();
    // Set up interval to fetch reports every 10 seconds
    const intervalId = setInterval(fetchReports, 10000);

    // Clean up function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on mount

  const toggleExpand = (index) => {
    const updatedReports = [...reports];
    updatedReports[index].expanded = !updatedReports[index].expanded;
    setReports(updatedReports);
  };

  return (
    <div className={styles.masterContainer}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>NGO Dashboard</h2>

      {reports.map((report, index) => (
        <Card
          key={report.id}
          className={`${styles.card} ${report.expanded ? styles.expanded : ''}`}
          style={{ // Apply inline styles for customization
            position: 'relative',
            padding:"3px",
            backgroundColor: '#F0F0F0', // Change background color
            alignItems: 'left',
            borderRadius: '20px', // Adjust border radius
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
            marginBottom: '15px', // Add some space between cards
            cursor: 'pointer', // Change cursor on hover
            opacity: '0.9',
            transition: 'transform 0.3s ease-in-out', // Add ease in and out transition effect
            '&:hover': { // Apply styles on hover
              boxShadow: '10px 10px 10px solid black', // Adjust box shadow on hover
            },
          }}
        >
          <CardContent onClick={() => toggleExpand(index)}>
            {/* Show image initially */}
            <img src={report.image} alt={report.description} className={styles.incidentImage} />
            <Typography gutterBottom variant="h5" component="div">
              <span style={{
                display: "inline-block",
                fontWeight: "semiBold",
                // paddingLeft: "30px",
                fontSize: window.innerWidth <= 768 ? "20px" : "30px",
                textAlign: "center"
              }}>Animal Type:</span>
              <span style={{
                display: "inline-block",
                fontSize: "20px"
              }}>
                {report.animal_type}
              </span>
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px',
              }}>
              {/* Change location to a hyperlink */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }} // Style hyperlink
              >
                Click here to get directions
              </a>
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px'
              }}>
              Landmark: {report.landmark}
            </Typography>

            {report.expanded && (
              <>
                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontSize: window.innerWidth <= 768 ? '14px' : '20px'
                  }}>
                  Description: {report.description}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontSize: window.innerWidth <= 768 ? '14px' : '20px',
                  }}>
                  Condition: {report.condition}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontSize: window.innerWidth <= 768 ? '14px' : '20px'
                  }}>
                  Name: {report.user_name}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontSize: window.innerWidth <= 768 ? '14px' : '20px'
                  }}>
                  Phone Number: {report.user_phone}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontSize: window.innerWidth <= 768 ? '14px' : '20px'
                  }}>
                  Email: {report.user_email}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '5px'
                  }}>
                  Status:
                  <select
                    value={report.status || ''}
                    onChange={(e) => handleStatusChange(report.id, e.target.value, setReports)} // Pass setReports to the function
                    className={styles.select}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Typography>
              </>
            )}
          </CardContent>
          <div className={styles.expandIcon} onClick={() => toggleExpand(index)}>
            <ExpandMoreIcon
              className={styles.expandIcon}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px'
              }} />
          </div>
        </Card>
      ))}

    </div>
  );
}

export default Dashboard;
