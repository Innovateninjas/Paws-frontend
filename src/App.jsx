import React ,{useEffect} from 'react';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentForm from './pages/user/ReportIncidentPages/IncidentMain';
import LandingPage from './pages/user/HomePage';
import LoginRegisterForm from './pages/user/UserRegistration';
import ViewReports from './pages/user/ViewReports'
import Navbar from './Components/shared/Navbar';
import UserPage from './pages/user/UserProfile';
import NgoPage from './pages/ngo/ngoProfile'
import Logout from './utils/Functions/Logout';
import Dashboard from './pages/ngo/Dashboard/dashboard';
import Donation from './pages/user/Donation/Donation';
import NgoRegister from './pages/ngo/NgoRegistration/NgoRegister';
import Campaign from './pages/ngo/CampaignNgoPage/campaignMain';
import Campaignlist from './pages/user/CampaignPages/CampaignList';
import Campaignblog from './pages/user/CampaignPages/CampaignPost';
import Stats from './pages/ngo/StatPage/StatsMain';
import { UserProvider } from './utils/contexts/UserContext';
import { NgoProvider } from './utils/contexts/NgoContext';
import Success from './pages/ngo/CampaignNgoPage/Success';
import NgoProfile from './pages/ngo/ngoProfile';
import { Donationfront } from './pages/user/Donation/Donationfront/Donationfront';
import requestPermission from './utils/Functions/notifyService';
import TeamPage from './pages/shared/team';
import NotFound from './Components/shared/PageNotfound';
/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);



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
          <Route path="/ngo" element={<NgoPage />} /> {/* Renders the NgoPage component */}
          <Route path="/logout" element={<Logout />} /> {/* Renders the Logout component */}
          <Route path="*" element={<NotFound/>} /> {/* Renders a 404 NOT FOUND message */}
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
          <Route path="/donationfront" element={<Donationfront />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
            </NgoProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
