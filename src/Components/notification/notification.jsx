import React from 'react';
import { IoNotifications } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Notification = ({ onClick, reports }) => {
    const filteredReports = reports.filter(report => report.status === "In Progress" || report.status === "Received");
    console.log(filteredReports);

    return (
        <>
            <Link to="/dashboard">
            <div className="flex w-screen justify-end relative">
                <IoNotifications style={{ margin: '20px'}} fontSize='30px' color='rgb(255,255,255)' />
                
                <div className="px-2 py-[3px]" style={{ position: 'absolute', top: '5px', right: '10px', backgroundColor: 'red',fontSize:'14px',borderRadius: '50%', color: 'white' }}>
                    {filteredReports.length}
                </div>
            </div>
            </Link>
        </>
    )
}

export default Notification