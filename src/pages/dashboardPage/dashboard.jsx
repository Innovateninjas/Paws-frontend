// Dashboard.js

import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';  // Import the CSS module

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [statusOptions] = useState(['Received', 'In Progress', 'Rescued']);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://aniresfr-backend.vercel.app/api/animals');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

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

  return (
    <div className={styles.masterContainer}>
      <h2 className={styles.heading}>NGO Dashboard</h2>
      <ul>
      <div className={styles.cardContainer}>
  {reports.map((report) => (
    <div key={report.id} className={styles.card}>
      <img src={report.image} alt={report.description} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <p><strong>Animal Type:</strong> {report.animal_type}</p>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Location:</strong>
          <ul>
            <li>Latitude - {report.latitude}</li>
            <li>Longitude - {report.longitude}</li>
          </ul>
        </p>
        <p><strong>Landmark:</strong> {report.landmark}</p>
        <p><strong>Name:</strong> {report.user_name}</p>
        <p><strong>Phone Number:</strong> {report.user_phone}</p>
        <p><strong>Email:</strong> {report.user_email}</p>
        <label>
          <strong>Status:</strong>
          <select
            value={report.status || ''}
            onChange={(e) => handleStatusChange(report.id, e.target.value)}
          >
            <option value="" disabled>Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  ))}
</div>
      </ul>
    </div>
  );
}

export default Dashboard;
