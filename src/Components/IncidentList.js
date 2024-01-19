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

  return (
    <div>
      <h2>Reported Incidents</h2>
      {reportedIncidents.length === 0 ? (
        <p>No reported incidents.</p>
      ) : (
        <ul>
          {reportedIncidents.map((incident) => (
            <li key={incident.id}>
              <strong>Name:</strong> {incident.user_name},{' '}
              <strong>Phone Number:</strong> {incident.user_phone},{' '}
              <strong>Email:</strong> {incident.user_email},{' '}
              <strong>Animal Type:</strong> {incident.animal_type},{' '}
              <strong>description:</strong> {incident.description},{' '}
              <strong>image:</strong> {incident.image},{' '}
              <strong>Condition:</strong> {incident.condition},{' '}
              <strong>Landmark:</strong> {incident.landmark},{' '}
              <strong>User's Location:</strong> Lat: {incident.latitude}, Lon: {incident.longitude}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncidentList;