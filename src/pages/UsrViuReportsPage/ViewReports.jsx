import React, { useEffect, useState, useContext } from 'react';
import styles from './ViewReports.module.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Viewreports from "..//..//Components/Skeletons/view-reports"
import { UserContext } from '../../contexts/UserContext';
function ViewReports() {
  // Fetch and store the reports data from your backend or any source
  const { userData, loading, error } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [length, setLength] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const fetchReports = async () => {
      // console.log(userData);
      try {
        const response = await fetch(`https://aniresfr-backend.vercel.app/api/animals`); // Replace with your actual API endpoint
        const data = await response.json();
        if(userData){
          const filteredReports = data.filter(element => element.user_email === userData.email);
          setReports(filteredReports);
          if(reports){
            setLength(reports.length)
          }
          setIsLoading(false);
        }
      }
       catch (error) {
        console.error('Error fetching reports:', error);
      }
    };     
    fetchReports();
  }, [userData, loading, error]);
  return (
<>
{
  !isLoading && (
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
      )}
    </div>
  )
}

  {
    isLoading&&(
      <>
      <Viewreports/>
      </>
  
    )
  }
</>

     );
    }

    export default ViewReports;
