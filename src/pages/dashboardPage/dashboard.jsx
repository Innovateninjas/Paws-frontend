// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import CardItem from './CardComponent/Card';
import DashboardSkeleton from '../../Components/Skeletons/dashboard';
import axios  from 'axios';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [statusOptions] = useState(['Received', 'In Progress', 'Rescued']);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://aniresfr-backend.vercel.app/api/animals');
        const data = await response.json();
        const updatedReports = data.map((report) => ({
          ...report,
          expanded: false,
        }));
        setReports(updatedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const toggleExpand = (index) => {
    const updatedReports = [...reports];
    updatedReports[index].expanded = !updatedReports[index].expanded;
    setReports(updatedReports);
  };

  return (
    <div className={styles.masterContainer}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>NGO Dashboard</h2>

      {reports.map((report, index) => (
        <CardItem
          key={report.id}
          report={report}
          index={index}
          statusOptions={statusOptions}
          toggleExpand={toggleExpand}
          setReports={setReports} 
        />
      ))}
    </div>
  );
}

export default Dashboard;
