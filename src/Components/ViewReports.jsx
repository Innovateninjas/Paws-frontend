import React, { useEffect, useState } from 'react';

function ViewReports() {
  // Fetch and store the reports data from your backend or any source
  const [reports, setReports] = useState([]);

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

  return (
    <div>
      <h2>View Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="incident-box">
            <p>Animal Type: {report.animal_type}</p>
            <p>Description: {report.description}</p>
            <img src={report.image} alt={report.description} className='incident-image'/>
            <p>Location: Latitude - {report.latitude}, Longitude - {report.longitude}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewReports;
