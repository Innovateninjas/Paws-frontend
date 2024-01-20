// IncidentList.js

import React, { useState, useEffect } from 'react';

function IncidentList() {
  const [reportedIncidents, setReportedIncidents] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://aniresfr-backend.vercel.app/api/animals'); // Replace with your actual API endpoint
        const data = await response.json();
        setReportedIncidents(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`https://aniresfr-backend.vercel.app/api/animals/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the status in the local state
      setReportedIncidents((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident.id === id ? { ...incident, status: newStatus } : incident
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <h2>Reported Incidents</h2>
      {reportedIncidents.length === 0 ? (
        <p>No reported incidents.</p>
      ) : (
        <ul>
          {reportedIncidents.map((incident) => (
            <li key={incident.id} className="incident-box">
              <img src={incident.image} alt={incident.description} />
              <p><strong>Name:</strong> {incident.user_name}</p>
              <p><strong>Phone Number:</strong> {incident.user_phone}</p>
              <p><strong>Email:</strong> {incident.user_email}</p>
              <p><strong>Animal Type:</strong> {incident.animal_type}</p>
              <p><strong>Description:</strong> {incident.description}</p>
              <p><strong>Condition:</strong> {incident.condition}</p>
              <p><strong>Landmark:</strong> {incident.landmark}</p>
              <p><strong>User's Location:</strong> Lat: {incident.latitude}, Lon: {incident.longitude}</p>
              <p>
                <strong>Status:</strong>{' '}
                <select
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                >
                  <option value="Not Resolved">Not Resolved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncidentList;