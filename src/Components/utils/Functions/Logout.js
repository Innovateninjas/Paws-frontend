import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const csrftoken = localStorage.getItem("csrftoken");
    axios.post('https://aniresfr-backend.vercel.app/logout/', {}, {
      headers: {
          'Authorization': `Token ${csrftoken}`,
      },
      withCredentials: true
    })
    .then(() => {
      localStorage.clear(); // clears both userData and csrf token at once 
      navigate('/');
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
  }, [navigate]);

  return null;
}

export default Logout;