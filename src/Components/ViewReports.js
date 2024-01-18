import React, { useEffect, useState } from 'react';

function ViewReports() {
  // Fetch and store the reports data from your backend or any source
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Replace this with your actual API endpoint or data source @anirbanmajumder0
    const fetchReports = async () => {
      try {
        // Dummy data
        const data = [
          {
            id: 1,
            animalType: 'Dog',
            description: 'A lost dog',
            condition: 'Normal',
            image: 'image_url',
            userLocation: { latitude: '40.7128', longitude: '74.0060' },
            name: 'John Doe',
            phoneNumber: '1234567890',
            email: 'johndoe@example.com',
          },
          {
            id: 2,
            animalType: 'Cat',
            description: 'A stray cat',
            condition: 'Urgent',
            image: 'image_url',
            userLocation: { latitude: '40.7128', longitude: '74.0060' },
            name: 'Jane Doe',
            phoneNumber: '0987654321',
            email: 'janedoe@example.com',
          },
          // Add more dummy data as needed
        ];
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
  
    fetchReports();
  }, []);

  return (
    <div>
      <h2>View Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
          <p>Animal Type: {report.animalType}</p>
          <p>Description: {report.description}</p>
          <img src={report.image} alt={report.description} />
          <p>Location: Latitude - {report.userLocation.latitude}, Longitude - {report.userLocation.longitude}</p>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewReports;
