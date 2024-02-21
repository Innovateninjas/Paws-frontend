import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentForm from './Components/incidentPage/IncidentForm';
import IncidentList from './Components/IncidentList';
import LandingPage from './Components/landingpage/HomePage';
import LoginRegisterForm from './Components/LoginRegister/LoginRegister';
import ViewReports from './Components/ViewReports';
import Navbar from './Components/navbar/Navbar';
import UserPage from './Components/UserPageComponent/UserPage';
import Logout from './Components/Logout';
import Dashboard from './Components/dashboard/dashboard';
import Donation from './Components/donation/Donation';

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div>
      <Router>
        <Navbar /> {/* Renders the Navbar component */}
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Renders the LandingPage component */}
          <Route path="/report-incident" element={<IncidentForm />} /> {/* Renders the IncidentForm component */}
          <Route path="/incident-list" element={<IncidentList />} /> {/* Renders the IncidentList component */}
          <Route path="/view-reports" element={<ViewReports />} /> {/* Renders the ViewReports component */}
          <Route path="/login" element={<LoginRegisterForm />} /> {/* Renders the LoginRegisterForm component */}
          <Route path="/register" element={<LoginRegisterForm />} /> {/* Renders the LoginRegisterForm component */}
          <Route path="/user" element={<UserPage />} /> {/* Renders the UserPage component */}
          <Route path="/logout" element={<Logout />} /> {/* Renders the Logout component */}
          <Route path="*" element={<h1>404 NOT FOUND</h1>} /> {/* Renders a 404 NOT FOUND message */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Renders the Dashboard component */}
          <Route path="/donation" element={<Donation />} /> {/* Renders the Donation component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
