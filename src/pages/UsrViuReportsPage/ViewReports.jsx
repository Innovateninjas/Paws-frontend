import React, { useEffect, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Viewreports from "..//..//Components/Skeletons/view-reports"
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

function ViewReports() {
  const { userData } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ngoNames, setNgoNames] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (userData) {
          const url = process.env.REACT_APP_BACKEND_URL;
          const response = await axios.get(`${url}/api/animals/?user_email=${userData.email}`);
          const data = response.data.reverse();
          setReports(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [userData]);

  useEffect(() => {
    const fetchNgoNames = async () => {
      const ngoNamesMap = {};
      await Promise.all(reports.map(async (report) => {
        if (report.assigned_to) {
          const ngoData = await fetchNGOData(report.assigned_to);
          if (ngoData) {
            ngoNamesMap[report.id] = ngoData.name;
          } else {
            ngoNamesMap[report.id] = "Unknown NGO";
          }
        }
      }));
      setNgoNames(ngoNamesMap);
    };

    if (!isLoading) {
      fetchNgoNames();
    }
  }, [reports, isLoading]);

  const fetchNGOData = async (email) => {
    try {
      const response = await axios.get(`https://paws-backend.azurewebsites.net/ngo?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NGO data:', error);
      return null;
    }
  };

  return (
    <>
    <div className="bg-gradient-to-b from-emerald-300 to-blue-500 min-h-screen">
      {!isLoading && (
        <div className="header">
          <h2 className="mb-5 mt-3 mx-auto text-center text-5xl font-bayon line-heigh-[6.9rem] text-[#40025D] tracking-widest">
            MY REPORTS
          </h2>
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No reports uploaded.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {reports.map((report, index) => (
                <Card
                key={report.id}
                className={`w-full bg-white bg-opacity-57 rounded-full backdrop-blur-5 shadow-lg border p-4 border-gray-300 relative mb-6 cursor-pointer transform transition duration-300 hover:shadow-2xl ${report.expanded ? 'expanded' : ''}`}
              >
                  <img src={report.image} alt={report.description} className="w-full z-30 opacity-100 h-56 object-cover object-center rounded-3xl border-2 border-black" />
                  <div className="p-4">
                    <Typography gutterBottom variant="h4" component="div" className="font-bold text-lg">{report.animal_type}</Typography>
                    <Typography variant="body1" className="text-sm">{report.description}</Typography>
                    <Typography variant="body1" className="text-sm">Address: {report.address}</Typography>
                    <Typography variant="body1" className="text-sm">Landmark: {report.landmark}</Typography>
                    <Typography variant="body1" className="text-sm">Reported At: {new Date(report.reported_time).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}</Typography>
                    <Typography variant="body1" className="text-sm">Condition: {report.condition}</Typography>
                    <Typography variant="body1" className="text-sm">Reported To: {report.assigned_to ? (
                      <span>{ngoNames[report.id] || "Loading..."}</span>
                    ) : "Not Assigned"}</Typography>
                    <Typography variant="body1" className="text-sm pb-2">Status: {report.status || 'No status'}</Typography>
                  </div>
                </Card>
              ))}
            </ul>
          )}
        </div>
      )}

      {isLoading && (
        <Viewreports />
      )}
    </div>
    </>
  );
}

export default ViewReports;
