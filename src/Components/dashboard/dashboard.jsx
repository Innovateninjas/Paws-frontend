import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [statusOptions] = useState(['Received', 'In Progress', 'Rescued']);

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
        // Update the local state after successful update
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
    <div>
      <h2>NGO Dashboard</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="incident-box">
            <img src={report.image} alt={report.description} className="incident-image" />
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
