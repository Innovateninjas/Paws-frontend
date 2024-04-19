import React ,{useContext,useState,useEffect} from 'react';
import { IoNotifications } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { NgoContext } from '../../utils/contexts/NgoContext';

const Notification = ({ onClick, reports }) => {
    const [userDetails, setUserData] = useState(null);
    const { NgoData, loading, error } = useContext(NgoContext);
    const [filteredReports, setFilteredReports] = useState([]);

    useEffect(() => {
        if (!loading && !error && NgoData) {
          setUserData(NgoData);
        }
    }, [NgoData, loading, error]);

    useEffect(() => {
        if(userDetails){
            setFilteredReports(reports
                .filter(report => report.assigned_to === userDetails.email)
                .filter(report => report.status === "In Progress" || report.status === "Received"));
        }
    }, [userDetails, reports]);

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