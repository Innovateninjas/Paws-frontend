import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import IncidentForm from './Components/incidentPage/IncidentForm';
import IncidentList from './Components/IncidentList';
import LandingPage from './Components/landingpage/HomePage'
import LoginRegisterForm from "./Components/LoginRegister/LoginRegister";
import ViewReports from './Components/ViewReports';
import Navbar from './Components/navbar/Navbar';
import UserPage from './Components/UserPage';
import Logout from './Components/Logout';
import Dashboard from './Components/dashboard/dashboard';

function App() {
  return (
      <div>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/report-incident" element={<IncidentForm />} />
                  <Route path="/incident-list" element={<IncidentList />} />
                  <Route path="/view-reports" element={<ViewReports />} />
                  <Route path="/login" element={<LoginRegisterForm />} />
                  <Route path="/register" element={<LoginRegisterForm />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="*" element={<h1>404 NOT FOUND</h1>} />
                  <Route path="/dashboard" element={<Dashboard/>} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
