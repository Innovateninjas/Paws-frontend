// Dashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import styles from "./dashboard.module.css";
import CardItem from "./CardComponent/Card";
import DashboardSkeleton from "../../Components/Skeletons/dashboard";
import { NgoContext } from "../../contexts/NgoContext";
import axios from "axios";

function Dashboard() {
  const { NgoData } = useContext(NgoContext);
  const [reports, setReports] = useState([]);
  const [length, setLength] = useState();
  const [statusOptions] = useState(["Received", "In Progress", "Rescued"]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (NgoData) {
          const response = await axios.get(
            `https://aniresfr-backend.vercel.app/api/animals/?assigned_to=voa@gmail.com`
          );
          const data = response.data;
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

  const toggleExpand = (index) => {
    const updatedReports = [...reports];
    updatedReports[index].expanded = !updatedReports[index].expanded;
    setReports(updatedReports);
  };

  return (
    <>
      <div className={styles.masterContainer}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "35px"  }}>
          NGO Dashboard
        </h2>

        {isLoading ? (
          // Render loading skeleton when isLoading is true
          <div>
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
            <DashboardSkeleton />
          </div>
        ) : (length === 0 ? (
          <p style={{ fontSize: "13px" }}>NO REPORTS UPLOADED YET.</p>
        ) : (
          // Render CardItem components when isLoading is false
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
        ))}
      </div>
    </>
  );
}

export default Dashboard;
