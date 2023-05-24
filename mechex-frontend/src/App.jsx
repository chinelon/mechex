
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { } from 'react-router-dom';
import './App.css';
import BookApp from './components/BookApp';
import ViewApp from './components/ViewApp';
import TrackProg from './components/TrackProg';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import About from './components/about';
import LandPage from './components/LandPage';
import Signup from './components/Signup';
import Signups from './components/Signups';
import Login from './components/Login';
import Dashboards from './components/Dashboards';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
