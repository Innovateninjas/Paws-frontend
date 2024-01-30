import React, { useEffect, useState } from 'react';
import axios from 'axios';
// #91baff and #205fff

function UserPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const csrftoken = localStorage.getItem('csrftoken');
      const response = await axios.get('https://aniresfr-backend.vercel.app/user', {
        headers: {
          'Authorization': `Token ${csrftoken}`,
        },
        withCredentials: true
      });
      setUserData(response.data);
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Info</h1>
      {/* Display user data here. This is just an example, adjust it based on your actual user data structure */}
      <p>Name: {userData.first_name}</p>
      <p>Email: {userData.username}</p>
      <p>Phone: {userData.last_name}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default UserPage;