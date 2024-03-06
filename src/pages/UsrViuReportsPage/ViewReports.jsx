import React, { useEffect, useState, useContext } from 'react';
import styles from './ViewReports.module.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Viewreports from "..//..//Components/Skeletons/view-reports"
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

function ViewReports() {
  const { userData } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ngoNames, setNgoNames] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (userData) {
          const url = `https://aniresfr-backend.vercel.app/api/animals/?user_email=${userData.email}`;
          const response = await axios.get(url);
          const data = response.data;
          setReports(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [userData]);

  useEffect(() => {
    const fetchNgoNames = async () => {
      const ngoNamesMap = {};
      await Promise.all(reports.map(async (report) => {
        if (report.assigned_to) {
          const ngoData = await fetchNGOData(report.assigned_to);
          if (ngoData) {
            ngoNamesMap[report.id] = ngoData.name;
          } else {
            ngoNamesMap[report.id] = "Unknown NGO";
          }
        }
      }));
      setNgoNames(ngoNamesMap);
    };

    if (!isLoading) {
      fetchNgoNames();
    }
  }, [reports, isLoading]);

  const fetchNGOData = async (email) => {
    try {
      const response = await axios.get(`https://aniresfr-backend.vercel.app/ngo?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NGO data:', error);
      return null;
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="header">
          <h2 className={styles.heading}>View Reports</h2>
          {reports.length === 0 ? (
            <p className={styles.noReport}>No reports uploaded.</p>
          ) : (
            <ul className={styles.cardContainer}>
              {reports.map((report, index) => (
                <Card
                  key={report.id}
                  className={`${styles.card} ${report.expanded ? styles.expanded : ''}`}
                  style={{
                    position: 'relative',
                    backgroundColor: '#F0F0F0',
                    borderRadius: '20px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                    cursor: 'pointer',
                    opacity: '0.9',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      boxShadow: '10px 10px 10px solid black',
                    },
                  }}
                >
                  <img src={report.image} alt={report.description} className={styles.incidentImage} />
                  <Typography gutterBottom variant="h4" component="div">
                    <span style={{ display: "inline-block", fontWeight: "bold", paddingLeft: "30px", paddingTop: "5px", fontSize: window.innerWidth <= 768 ? "20px" : "30px", textAlign: "center" }}>Animal Type:</span>
                    <span style={{ display: "inline-block", fontSize: "25px" }}>{report.animal_type}</span>
                  </Typography>
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Description: {report.description}
                  </Typography>
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Address : {report.address}
                  </Typography>
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Landmark: {report.landmark}
                  </Typography>
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Reported At: {new Date(report.reported_time).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </Typography>
                    {/* <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Number of Animals: {report.numberOfAnimals}
                    </Typography> */}
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Condition: {report.condition}
                  </Typography>
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px' }}>
                    Reported To: {report.assigned_to ? (
                      <span>
                        {ngoNames[report.id] || "Loading..."}
                      </span>
                    ) : "Not Assigned"}
                  </Typography>
                  <Typography variant="body1" color="text.primary" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '15px', paddingBottom: '10px' }}>
                    Status: {report.status || 'No status'}
                  </Typography>
                </Card>
              ))}
            </ul>
          )}
        </div>
      )}

      {isLoading && (
        <>
          <Viewreports />
        </>
      )}
    </>
  );
}

export default ViewReports;
