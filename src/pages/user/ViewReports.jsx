import React, { useEffect, useState, useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from '@mui/material/Card';
import ViewreportsSkeletonLoader from "../../Components/user/SkeletonLoaders/ViewReportsCard";
import { UserContext } from "../../utils/contexts/UserContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onMessage } from "firebase/messaging";
import { messaging } from '../../firebase';

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

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("Background message received:", payload);
      await fetchReports();
      toast.info(payload.notification.body);
    });

    return () => {
      unsubscribe();
    };

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
    <>
    <ToastContainer position="top-right" autoClose={5000} />
    <div>
    <div className="bg-custom-gradient min-h-screen max-h-fit flex flex-col font-ChauPhilomeneOne pb-[120px]">
      {!isLoading && (
        <>
          {/* Heading */}
          <h2 className="mx-auto mt-6 text-center text-5xl underline line-height-[6.9rem] text-[#40025D] tracking-wider drop-shadow-2xl">
            MY REPORTS
          </h2>
          {/* If no reports are present  */}
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 text-2xl tracking-wider mt-10">
              No reports uploaded.
            </p>
          ) : (
            // If reports are present
            <ul className="w-screen flex flex-col justify-center p-4 items-center gap-5">
              {reports.map((report, index) => (
                <>
                <Card  key={report.id}
                  className="bg-gradient-to-b from-[#1e85e420] to-[#1E85E440] flex flex-col w-full items-center justify-center p-2 shadow-dashBoardCardImageShadow"
                  style={{
                      border: '1px solid #75757575', 
                      borderRadius: '15px', 
                       }}>
                  <img
                    src={report.image}
                    alt={report.description}
                    className=" h-auto max-h-[22rem] w-[18.3rem] rounded-[20px] object-cover shadow-dashBoardCardImageShadow m-2"
                  />
                  <div className="flex w-full pt-1 p-3 flex-col justify-center text-[17px] font-ChauPhilomeneOne text-[#090443] drop-shadow-2xl leading-relaxed ">
                  <div className="flex justify-between items-center">
                    <p className="text-2xl capitalize">
                      Animal Type : {report.animal_type}
                    </p>
                    <div>
                    <ExpandMoreIcon
                      onClick={() => toggleExpand(index)}
                      className={`${
                        report.expanded ? "rotate-180 absolute bottom-1 right-3 " : ""
                      }`}
                    />
                    </div>
                    </div>
                    {/* When Expanded */}
                    {report.expanded && (
                      <div className="pt-2 flex flex-col gap-1">
                        <p className=" drop-shadow-xl ">
                        <span className="font-semibold mr-1 border-t-white tracking-widest">
                        Description: 
                        </span> {report.description}</p>
                    
                        <p >
                         <span className="font-semibold mr-1 tracking-widest">
                         Address: 
                        </span>
                        <span> {report.address}</span></p>

                        <p> 
                        <span className="font-semibold mr-1 tracking-widest">
                        Landmark: 
                        </span> {report.landmark}</p>

                        <p>
                        <span className="font-semibold mr-1 tracking-widest">
                        Reported At:  
                        </span>{report.reported_time}</p>

                        <p><span className="font-semibold mr-1 tracking-widest">
                        Condition: 
                        </span> {report.condition}</p>

                        <p>
                        <span className="font-semibold mr-1 tracking-widest">
                        Reported To:
                        </span>
                          {report.assigned_to ? (
                            <span>{ngoNames[report.id] || "Loading..."}</span>
                          ) : (
                            "Not Assigned"
                          )}
                        </p>
                        <p className="">
                        <span className="font-semibold mr-1 tracking-widest">
                        Status:
                        </span>
                           {report.status || "No status"}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
                </>
              ))}
            </ul>
          )}
        </>
      )}

      {isLoading && 
      (
        <div className="w-screen h-screen flex flex-col items-center mt-10"><ViewreportsSkeletonLoader /></div>
      )
      }
    </div>
    </div>
    </>
  );
}

export default ViewReports;
