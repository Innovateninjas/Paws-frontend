//dashboard.js

import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const response = await fetch(`https://aniresfr-backend.vercel.app/api/animals/${reportId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId ? { ...report, status: newStatus } : report
          )
        );
      } else {
        console.error('Error updating status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleExpand = (index) => {
    const updatedReports = [...reports];
    updatedReports[index].expanded = !updatedReports[index].expanded;
    setReports(updatedReports);
  };

  return (
    <div className={styles.masterContainer}>
      <h2 className={styles.heading}>NGO Dashboard</h2>
     
      {reports.map((report, index) => (
        <Card
          key={report.id}
          className={`${styles.card} ${report.expanded ? styles.expanded : ''}`}
        >
          <CardContent onClick={() => toggleExpand(index)}>
            {/* Show image initially */}
            <img src={report.image} alt={report.description} className={styles.incidentImage} />
            <Typography gutterBottom variant="h4" component="div">
              <span style={{ display: "inline-block",fontWeight: "bold", paddingLeft: "40px",paddingTop: "5px",fontSize: "35px", textAlign: "center" }}>Animal Type:</span> {report.animal_type}
            </Typography>
            <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
              Address - {report.latitude}, {report.longitude}
            </Typography>
            <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
              Landmark: {report.landmark}
            </Typography>
            {report.expanded && (
              <>
                <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
                  Description: {report.description}
                </Typography>
                <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
                  Name: {report.user_name}
                </Typography>
                <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
                  Phone Number: {report.user_phone}
                </Typography>
                <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
                  Email: {report.user_email}
                </Typography>
                <Typography variant="body1" color="text.primary" style={{ fontSize: '20px',paddingLeft: '5px' }}>
                  Status:
                  <select
                    value={report.status || ''}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
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
          <div className={styles.expandIconContainer} onClick={() => toggleExpand(index)}>
            <div className={styles.expandIconCircle}>
              <ExpandMoreIcon className={styles.expandIcon} />
            </div>
          </div>
        </Card>
      ))}
      
    </div>
  );
}

export default Dashboard;