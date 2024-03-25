import React, { useState, useEffect, useContext } from "react";
import CardItem from "./Card";
import DashboardSkeleton from "../../Components/Skeletons/dashboard";
import { NgoContext } from "../../contexts/NgoContext";
import axios from "axios";

function Dashboard() {
  
  const { NgoData } = useContext(NgoContext);
  const [reports, setReports] = useState([]);
  const [length, setLength] = useState();
  const [statusOptions] = useState(["Received", "In Progress", "Rescued"]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reports from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (NgoData) {
          const response = await axios.get(
            `https://aniresfr-backend.vercel.app/api/animals/?assigned_to=${NgoData.email}`
          );
          const data = response.data.reverse();
          setLength(data.length);
          const updatedReports = data.map((report) => ({
            ...report,
            reported_time: new Date(report.reported_time).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              }
            ),
            expanded: false,
          }));
          setReports(updatedReports);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [NgoData]);

  // Function to toggle report card expansion
  const toggleExpand = (index) => {
    const updatedReports = [...reports];
    updatedReports[index].expanded = !updatedReports[index].expanded;
    setReports(updatedReports);
  };

  return (
    <>
      {/* Gradient background */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-dashboard-gradient-top to-dashboard-gradient-bottom z-0"></div>

      {/* Dashboard content */}
      <div className="relative z-10 w-screen min-h-screen p-5 flex flex-col overflow-y-auto">
        {/* NGO Dashboard Title */}
        <h2 className="mb-5 mt-3 mx-auto text-5xl font-bayon line-heigh-[6.9rem] text-[#40025D] tracking-widest">
          NGO Dashboard
        </h2>

        {/* Render loading skeleton or report cards */}
        {isLoading ? (
          // Loading Skeletons
          <div>
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
          </div>
        ) : length === 0 ? (
          // No reports assigned message
          <p className="text-2xl text-center font-bayon tracking-widest mt-[15rem]">NO REPORTS ASSIGNED YET.</p>
        ) : (
          // Render report cards
          reports.map((report, index) => (
            <CardItem
              key={report.id}
              report={report}
              index={index}
              statusOptions={statusOptions}
              toggleExpand={toggleExpand}
              setReports={setReports}
            />
          ))
        )}
      </div>
    </>

  );
}

export default Dashboard;
