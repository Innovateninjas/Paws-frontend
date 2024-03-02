import React, { useEffect, useState } from 'react';
import styles from './ViewReports.module.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function ViewReports() {
  // Fetch and store the reports data from your backend or any source
  const [reports, setReports] = useState([]);


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://aniresfr-backend.vercel.app/api/animals'); // Replace with your actual API endpoint
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
  
    fetchReports();
  }, []);

  return (
    <div className="header">
      <h2 className={styles.heading}>View Reports</h2>
      <ul className={styles.cardContainer}>
      {reports.map((report, index) => (
        <Card
        key={report.id}
        className={`${styles.card} ${report.expanded ? styles.expanded : ''}`}
        style={{ // Apply inline styles for customization
          position: 'relative',
          backgroundColor: '#F0F0F0', // Change background color
          borderRadius: '20px', // Adjust border radius
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
          marginBottom: '20px', // Add some space between cards
          cursor: 'pointer', // Change cursor on hover
          opacity:'0.9',
          transition: 'transform 0.3s', // Add transition effect
          '&:hover': { // Apply styles on hover
           
            boxShadow: '10px 10px 10px solid black', // Adjust box shadow on hover
          },
        }}
        >
          
          <img src={report.image} alt={report.description} className={styles.incidentImage} />
            <Typography gutterBottom variant="h4" component="div">
              <span style={{ display: "inline-block", fontWeight: "bold", paddingLeft: "30px", paddingTop: "5px", fontSize: window.innerWidth <= 768 ? "20px" : "30px", textAlign: "center" }}>Animal Type:</span>
              <span style={{ display: "inline-block", fontSize: "25px" }}>{report.animal_type}</span>
            </Typography>
            <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
              Address - {report.latitude}, {report.longitude}
            </Typography>
            <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
              Landmark: {report.landmark}
            </Typography>
            <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                  Condition: {report.condition}
                </Typography>
                <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px', paddingBottom: '10px' }}>
                 Status: {report.status || 'No status'}
                  </Typography>
               </Card>
     ))}
               </ul>
      </div>
     );
    }

    export default ViewReports;
