// IncidentList.js

import React, { useState, useEffect } from 'react';

function IncidentList() {
  const [reportedIncidents, setReportedIncidents] = useState([]);

  useEffect(() => {
    // Fetch reported incidents from the backend or any storage mechanism
    // For demonstration purposes, using dummy data
    const dummyData = [
      {
        id: 1,
        name: 'John Doe',
        animalType: 'Dog',
        condition: 'Critical',
        phoneNumber: '123-456-7890',
        landmark: 'Central Park',
        userLocation: { latitude: '40.785091', longitude: '-73.968285' },
      },
      {
        id: 2,
        name: 'Jane Smith',
        animalType: 'Cat',
        condition: 'Urgent',
        phoneNumber: '987-654-3210',
        landmark: 'Times Square',
        userLocation: { latitude: '40.758896', longitude: '-73.985130' },
      },
      // Add more incidents as needed
    ];

    setReportedIncidents(dummyData);
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
              <strong>Name:</strong> {incident.name},{' '}
              <strong>Animal Type:</strong> {incident.animalType},{' '}
              <strong>Condition:</strong> {incident.condition},{' '}
              <strong>Phone Number:</strong> {incident.phoneNumber},{' '}
              <strong>Landmark:</strong> {incident.landmark},{' '}
              <strong>User's Location:</strong> Lat: {incident.userLocation.latitude}, Lon: {incident.userLocation.longitude}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncidentList;
