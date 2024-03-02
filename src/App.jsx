import React from 'react';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
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
import Campaignlist from './pages/Volunteer/campaignList/campaignList';
import Campaignblog from './pages/Volunteer/campaign/campaignBlog';
import Stats from './pages/StatPage/stats';
import { UserProvider } from './contexts/UserContext';
import { NgoProvider } from './contexts/NgoContext';
import Success from './pages/CampaignNgoPage/SuccessPage/Success';
import NgoProfile from './pages/NgoProfilepage/ngoProfile';
/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div>
      <Router>
        <UserProvider>
        <NgoProvider>
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
          <Route path="/campaignList" element={<Campaignlist />} /> {/* Renders the CreateCampaign component */}
          <Route path="/campaignBlog/:campaignId" element={<Campaignblog />} />
              <Route path="/stats" element={< Stats/>} />
          <Route path="/created" element={<Success />} />
          <Route path="/ngoProfile" element={<NgoProfile />} />
        </Routes>
            </NgoProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
