import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // clears both userData and csrf token at once 
    navigate('/');
    window.location.reload();
  }, [navigate]);

}

export default Logout;