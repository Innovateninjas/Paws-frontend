import React, { useEffect, useState, useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiDollarSign, FiAward, FiActivity } from 'react-icons/fi';
import Loader from '../../Components/loaders/loader';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function UserPage() {
  const [userDetails, setUserData] = useState(null);
  const { userData, loading, error } = useContext(UserContext);
  const profileIconSource = "./images/profile_icon.png";

  function ProfileIcon({ style }) {
    return <img src={profileIconSource} style={style} alt="Profile Icon" />;
  }

  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);

  useEffect(() => {
    console.log(userDetails); // log userDetails to the console
  }, [userDetails]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <Loader visible />;
  }

  if (userDetails) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-300 to-blue-500 p-10">
        <div className="flex flex-col items-center rounded-2xl w-full max-w-max mb-8">
          <div className="wrap">
            <div className="profilepic border-4 border-blue-900 bg-blue-900 p-2 rounded-full">
              <ProfileIcon style={{ margin: 'auto', width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%', boxShadow: '1px 2px 2px black' }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-5 w-full max-w-3xl">
          <div className="flex flex-col rounded-2xl p-5 bg-gray-200 shadow-lg w-full">
            <p className="flex items-center text-2xl font-bold mb-4">
              <span className="rounded-full bg-blue-900 p-2 mr-2">
                <FiUser color="white" />
              </span>
              <span className="font-bold">{userDetails.name}</span>
            </p>
            <p className="flex items-center text-xl mb-2 font-bold">
              <span className="rounded-full bg-blue-900 p-2 mr-2">
                <FiMail color="white" />
              </span>
              {userDetails.email}
            </p>
            <p className="flex items-center text-xl mb-2 font-bold">
              <span className="rounded-full bg-blue-900 p-2 mr-2">
                <FiPhone color="white" />
              </span>
              <span className="font-bold">{userDetails.phone_number}</span>
            </p>
            <div className="mb-4">
              <p className="flex items-center text-xl mb-2 font-bold">
                <span className="rounded-full bg-blue-900 p-2 mr-2">
                  <FiAward color="white" />
                </span>
                <span className="font-bold">Level: {userDetails.level}</span>
              </p>
              <progress value={userDetails.level} max="100" className="w-full h-8 bg-gray-300 overflow-hidden rounded-full border border-black"></progress>
            </div>
            <p className="flex items-center text-xl mb-2 font-bold">
              <span className="rounded-full bg-blue-900 p-2 mr-2">
                <FiActivity color="white" />
              </span>
              <span className="font-bold">No of Reports: {userDetails.no_reports}</span>
            </p>
            <p className="flex items-center text-xl mb-2 font-bold text-yellow-600">
              <span className="rounded-full bg-blue-900 p-2 mr-2">
                <FiDollarSign color="white" />
              </span>
              <span className="font-bold">Coins: {userDetails.coins}</span>
            </p>
            <br />
          </div>
          <div className="flex gap-3 mt-8 mb-8">
            <button className="px-8 py-4 bg-gradient-to-b from-green-400 to-green-700 text-black rounded-full shadow-lg hover:bg-green-600 font-bold text-lg">
              <Link to="/view-reports">My Reports</Link>
            </button>
            <button className="px-8 py-4 bg-gradient-to-b from-red-500 to-red-900 text-black rounded-full shadow-lg hover:bg-red-600 font-bold text-lg">
              <Link to="/logout">Logout</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
