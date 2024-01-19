import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import IncidentForm from './Components/incidentPage/IncidentForm';
import IncidentList from './Components/IncidentList';
import LandingPage from './Components/landingpage/HomePage'
import LoginForm from './Components/LoginForm';
// import bigButton from './Components/buttons/bigButton';
import RegisterForm from './Components/RegisterForm';
import ViewReports from './Components/ViewReports';
import Navbar from './Components/Navbar';
import UserPage from './Components/UserPage';
import Logout from './Components/Logout';

function App() {
  return (
      <div>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  {/* <Route
                      path="/"
                      element={
                          <Button
                              text="Report to Authority"
                          />
                      }
                  /> */}
                  <Route path="/report-incident" element={<IncidentForm />} />
                  <Route path="/incident-list" element={<IncidentList />} />
                  <Route path="/view-reports" element={<ViewReports />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/logout" element={<Logout />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
