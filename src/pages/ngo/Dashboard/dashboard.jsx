import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardItem from "./Card";
import DashboardSkeleton from "../../../Components/ngo/SkeletonLoaders/dashboard";
import { NgoContext } from "../../../utils/contexts/NgoContext";
import axios from "axios";
import { onMessage } from "firebase/messaging";
import { messaging } from '../../../firebase';

function Dashboard() {
  const { NgoData } = useContext(NgoContext);
  const [reports, setReports] = useState([]);
  const [length, setLength] = useState();
  const [statusOptions] = useState(["Received", "In Progress","Not Found", "Rescued","dead"]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [clicked, setClicked] = useState([false, false, false]);
  const category = ["In Progress", "Received", "Rescued"];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (NgoData) {
          const url = process.env.REACT_APP_BACKEND_URL;
          const response = await axios.get(
            `${url}/api/animals/?assigned_to=${NgoData.email}`
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

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("Background message received:", payload);
      if (payload.notification.body ==="A new report has been made near you."){
        await fetchReports();
        toast.success(`New report received near you.`);
      }
      // Fetch reports again when a new report is added
    });

    // Clean up function
    return () => {
      unsubscribe();
    };
  }, [NgoData]);



  // Function to toggle report card expansion
  const toggleExpand = (id) => {
    const updatedReports = [...reports];
    updatedReports.map((report) => {
      if (report.id === id) {
        report.expanded = !report.expanded;
      }
      return report;
    });
    setReports(updatedReports);
  };

  const handle = (index) => {
    setClicked((prevState) => {
      let newClicked = [...prevState];
      newClicked[index] = !newClicked[index];
      return newClicked;
    })
    setCategories((prevState) => {
      let newCategories = [...prevState];
      if (!newCategories.includes(category[index])) {
        // newCategories.pop()
        newCategories.unshift(category[index]);
      } else {
        newCategories = newCategories.filter((cat) => cat !== category[index]);
      }
      return newCategories;
    })
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      {/* Gradient background */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-custom-gradient z-0"></div>
      {/* Dashboard content */}
      <div className="relative z-10 w-screen min-h-screen p-5 flex flex-col overflow-y-auto">
        {/* NGO Dashboard Title */}
        <h2 className="mb-2 mt-3 mx-auto text-5xl font-bayon line-heigh-[6.9rem] text-[#40025D] tracking-widest">
          NGO Dashboard
        </h2>
       {/* FITER */}
        {reports.length > 0 && (
          <div className="flex w-full justify-around px-2 py-3 ">
         {category.map((category, index) => {
  const categoryCount = reports.filter(report => report.status === category).length;
  return (
    <button
      key={index}
      className={`${clicked[index] ? 'bg-gray-400' : 'bg-gray-300'} bg-opacity-47 px-3 py-1 border border-gray-400 relative text-[20px] shadow-dashBoardCardImageShadow font-ChauPhilomeneOne rounded-[10px]`}
      onClick={() => {
        handle(index);
      }}
    >
      {category} 
      {categoryCount > 0 && category !== 'Rescued' && (
        <div className="px-2 py-[3px] text-center" style={{ position: 'absolute', top: '-16px', right: '-8px', backgroundColor: 'red',fontSize:'14px',borderRadius: '50%', color: 'white' }}>
          {categoryCount}
        </div>
      )}
    </button>
  );
})}
          </div>
        )}   
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
          /* RENDERING ON BASIS OF CATEGORIES */
              categories.length !== 0 ? (
                reports.filter((elem) => categories.includes(elem.status)).map((report, index) => (
                  
                  <CardItem
                    key={report.id}
                    report={report}
                    index={index}
                    statusOptions={statusOptions}
                    toggleExpand={toggleExpand}
                    setReports={setReports}
                  />
                ))
              ) : (
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
              )

        )}         
        <div className="bottom-0 h-32 right-0 p-5">
        </div>
      </div>
    </>
  );
}

export default Dashboard;
