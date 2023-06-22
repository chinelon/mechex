
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
import BookApp from './components/customers/BookApp';
import ViewApp from './components/customers/ViewApp';
import TrackProg from './components/customers/TrackProg';
import Navbar from './components/NavBar';
import Dashboard from './components/customers/Dashboard';
import About from './components/About';
import ContactUs from './components/ContactUs';
import LandPage from './components/LandPage';
import Signup from './components/customers/Signup';
import Signups from './components/mechanics/Signups';
import Login from './components/Login';
import Dashboards from './components/mechanics/Dashboards';
import FollowUp from './components/mechanics/FollowUp';
import ViewApps from './components/mechanics/ViewApps';
import Map from './components/customers/Map';
import {withGoogleMaps} from 'react-google-maps'
import ViewMech from './components/customers/ViewMech';

//defines session context
export const SessionContext = createContext();

function App() {
  const [appointments, setAppointments] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [users, setUsers] = useState([]);
  const [progress, setProgress] = useState([]);
  const [session, setSession] = useState(null);
  const [user_id, setUser_Id] = useState()
  const [mechanic_id, setMechanic_Id] = useState()

  useEffect(() => {
    // Check if there is a session stored in local storage
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession((storedSession));
    }
  }, []);

  const handleLogin = (sessionIdentifier, user_id, mechanic_id) => {
    setSession(sessionIdentifier);
    localStorage.setItem('session', sessionIdentifier);
    localStorage.setItem('id', user_id);
    localStorage.setItem('mid', mechanic_id)
    setMechanic_Id(mechanic_id);
    setUser_Id(user_id); // Set the user_id in the state
    console.log(user_id)
  };

  const handleLogout = () => {
    alert('You are now logged out')
    const navigate = useNavigate();
    // Perform logout logic
    // ...

    // Clear the session from state and local storage
    setSession(null);
    localStorage.removeItem('session');
    navigate('/login');
  };

  const ProtectedRoute = ({ path, element }) => {

    //const navigate = useNavigate();
    if (!session) {
      return <Navigate to="/login" />;
    }

    return <Routes> <Route path={path} element={element} /> </Routes>
  };

  return (
    <SessionContext.Provider value={{ session, handleLogout }}>
      <Router>
        <div className="App">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signups" element={<Signups />} />
            <Route path="/map" element={<Map />} />


            <Route path="/dashboard/*" element={<ProtectedRoute path="/" element={<Dashboard />} />} />
            <Route path="/dashboards/*" element={<ProtectedRoute path="/" element={<Dashboards />} />} />
            <Route path="/booking/*" element={<ProtectedRoute path="/" element={<BookApp user_id={user_id} />} />} />
            <Route path="/appointments/*" element={<ProtectedRoute path="/" element={<ViewApp />} />} />
            <Route path="/appointment/*" element={<ProtectedRoute path="/" element={<ViewApps />} />} />
            <Route path="/progress/*" element={<ProtectedRoute path="/" element={<TrackProg />} />} />
            <Route path="/follow-up/:appointment_id/*" element={<ProtectedRoute path="/" element={<FollowUp />} />} />
           
            <Route path="/mechanics/:mechanicId/*" element={<ProtectedRoute path="/" element={<ViewMech />} />} />


            
          </Routes>
        </div>
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
