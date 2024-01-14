import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import IncidentForm from './Components/IncidentForm';
import IncidentList from './Components/IncidentList';
import Location from './Components/Location';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Location />} />
      <Route path="/report-incident" element={<IncidentForm />} />
      <Route path="/incident-list" element={<IncidentList />} />
    </Routes>
  </Router>
  );
}

export default App;
