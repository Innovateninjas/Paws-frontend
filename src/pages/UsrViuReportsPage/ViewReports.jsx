import React, { useEffect, useState, useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Viewreports from "..//..//Components/Skeletons/view-reports";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

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
          const response = await axios.get(
            `${url}/api/animals/?user_email=${userData.email}`
          );
          const data = response.data.reverse();
          const updatedReports = data.map((element) => ({
            ...element,
            expanded: false,
            reported_time: new Date(element.reported_time).toLocaleString(
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
          }));
          setReports(updatedReports);
          console.log(updatedReports);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [userData]);

  useEffect(() => {
    const fetchNgoNames = async () => {
      const ngoNamesMap = {};
      await Promise.all(
        reports.map(async (report) => {
          if (report.assigned_to) {
            const ngoData = await fetchNGOData(report.assigned_to);
            if (ngoData) {
              ngoNamesMap[report.id] = ngoData.name;
            } else {
              ngoNamesMap[report.id] = "Unknown NGO";
            }
          }
        })
      );
      setNgoNames(ngoNamesMap);
    };

    if (!isLoading) {
      fetchNgoNames();
    }
  }, [reports, isLoading]);

  const fetchNGOData = async (email) => {
    try {
      const response = await axios.get(
        `https://paws-backend.azurewebsites.net/ngo?email=${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO data:", error);
      return null;
    }
  };
  const toggleExpand = (index) => {
    const updatedReports = [...reports];
    updatedReports[index].expanded = !updatedReports[index].expanded;
    setReports(updatedReports);
    console.log(reports);
  };
  return (
    <div className="bg-gradient-to-b from-emerald-300 to-blue-500 flex flex-col mb-[60px] font-ChauPhilomeneOne">
      {!isLoading && (
        <>
          {/* Heading */}
          <h2 className="mx-auto mt-6 text-center text-5xl underline line-height-[6.9rem] text-[#40025D] tracking-wider drop-shadow-2xl">
            MY REPORTS
          </h2>
          {/* If no reports are present  */}
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No reports uploaded.
            </p>
          ) : (
            // If reports are present
            <ul className="w-screen flex flex-col justify-center p-6 items-center gap-5">
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className="bg-white bg-opacity-57 flex flex-col items-center justify-center  rounded-[20px] backdrop-blur-[6px] shadow-dashBoardCardImageShadow"
                >
                  <img
                    src={report.image}
                    alt={report.description}
                    className="h-[12.5rem] w-[18.3rem] rounded-[20px] object-cover shadow-dashBoardCardImageShadow m-4 "
                  />
                  <div className="flex w-full pt-1 p-4 flex-col justify-center text-[17px] font-ChauPhilomeneOne text-[#0B0553F5] drop-shadow-2xl leading-relaxed ">
                    <p className="text-2xl  capitalize">
                      Animal Type : {report.animal_type}
                    </p>
                    <div>
                    <ExpandMoreIcon
                      onClick={() => toggleExpand(index)}
                      className={`absolute bottom-2 right-3 ${
                        report.expanded ? "rotate-180" : ""
                      }`}
                    />
                    </div>
                    {/* When Expanded */}
                    {report.expanded && (
                      <div>
                        <p className=" drop-shadow-xl "> Description: {report.description}</p>
                        <p>Address: {report.address}</p>
                        <p>Landmark: {report.landmark}</p>
                        <p>Reported At: {report.reported_time}</p>
                        <p>Condition: {report.condition}</p>
                        <p>
                          Reported To:{" "}
                          {report.assigned_to ? (
                            <span>{ngoNames[report.id] || "Loading..."}</span>
                          ) : (
                            "Not Assigned"
                          )}
                        </p>
                        <p className="">
                          Status: {report.status || "No status"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          )}
        </>
      )}

      {isLoading && <Viewreports />}
    </div>
  );
}

export default ViewReports;
