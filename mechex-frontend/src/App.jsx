
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { } from 'react-router-dom';
import './App.css';
import BookApp from './components/customers/BookApp';
import ViewApp from './components/customers/ViewApp';
import TrackProg from './components/customers/TrackProg';
import Navbar from './components/Navbar';
import Dashboard from './components/customers/Dashboard';
import About from './components/about';
import LandPage from './components/LandPage';
import Signup from './components/customers/Signup';
import Signups from './components/mechanics/Signups';
import Login from './components/Login';
import Dashboards from './components/mechanics/Dashboards';
import FollowUp from './components/mechanics/FollowUp';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [users, setUsers] = useState([]);
  const [progress, setProgress] = useState([]);

  /*  useEffect(() => {
      fetch('/api/appointments')
        .then(res => res.json())
        .then(data => setAppointments(data))
        .catch(error => console.log(error));
  
      fetch('/api/mechanics')
        .then(res => res.json())
        .then(data => setMechanics(data))
        .catch(error => console.log(error));
  
      fetch('/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.log(error));
  
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => setProgress(data))
        .catch(error => console.log(error));
    }, []);*/

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact-Us />} />
          <Route path="/booking" element={<BookApp />} />
          <Route path="/appointments" element={<ViewApp />} />
          <Route path="/progress" element={<TrackProg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signups" element={<Signups />} />
          <Route path="/follow-up" element={<FollowUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
