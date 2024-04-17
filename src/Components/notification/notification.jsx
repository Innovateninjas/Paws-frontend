import React, { useState } from 'react'
import { IoNotifications } from "react-icons/io5";
const Notification = ({ onClick, reports }) => {
    const [showDot, setShowDot] = useState(false);    
    const filteredReports = reports.filter(report => report.status === "In Progress" || report.status === "Received");
    console.log(filteredReports);
  return (
    <>
     <div className="flex w-screen justify-end relative" onClick={() => { onClick(); setShowDot((prev)=> !prev); }}>
        <IoNotifications style={{ margin: '20px'}} fontSize='30px' color='rgb(255,255,255)' />
        {showDot && <div style={{ position: 'absolute', top: '15px', right: '20px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red' }} />}
    </div>
    </>
   
  )
}

export default Notification