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
        {reports.map((report) => (
          <li key={report.id} className={styles.incidentBox}>
            <img src={report.image} alt={report.description} className={styles.incidentImage} />
            <div>
              <p>Animal Type: {report.animal_type}</p>
              <p>Description: {report.description}</p>
              <p>Location: Latitude - {report.latitude}, Longitude - {report.longitude}</p>
              <p>Landmark: {report.landmark}</p>
              <p>Name: {report.user_name}</p>
              <p>Phone Number: {report.user_phone}</p>
              <p>Email: {report.user_email}</p>
              <label>
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
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
