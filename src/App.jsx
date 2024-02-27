import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentForm from './pages/ReportIncidentPage/IncidentMain';
import LandingPage from './pages/landingpage/HomePage';
import LoginRegisterForm from './pages/LoginRegisterPage/LoginRegister';
import ViewReports from './pages/UsrViuReportsPage/ViewReports'
import Navbar from './Components/navbar/Navbar';
import UserPage from './pages/UserProfilePage/UserPage';
import Logout from './Components/utils/Functions/Logout';
import Dashboard from './pages/dashboardPage/dashboard';
import Donation from './pages/DonationPage/Donation';
import NgoRegister from './pages/NgoRegistration/NgoRegister';
import Campaign from './pages/CampaignNgoPage/campaignMain';

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
          <Route path="/view-reports" element={<ViewReports />} /> {/* Renders the ViewReports component */}
          <Route path="/login" element={<LoginRegisterForm />} /> {/* Renders the LoginRegisterForm component */}
          <Route path="/register" element={<LoginRegisterForm />} /> {/* Renders the LoginRegisterForm component */}
          <Route path="/user" element={<UserPage />} /> {/* Renders the UserPage component */}
          <Route path="/logout" element={<Logout />} /> {/* Renders the Logout component */}
          <Route path="*" element={<h1>404 NOT FOUND</h1>} /> {/* Renders a 404 NOT FOUND message */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Renders the Dashboard component */}
          <Route path="/donation" element={<Donation />} /> {/* Renders the Donation component */}
          <Route path="/ngologin" element={<NgoRegister />} /> {/* Renders the NGORegistration component */}
          <Route path="/ngoregister" element={<NgoRegister />} /> {/* Renders the NGORegistration component */}
          <Route path="/createcampaign" element={<Campaign />} /> {/* Renders the CreateCampaign component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
