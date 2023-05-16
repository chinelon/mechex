/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact-Us />} />
          <Route path="/booking" element={<BookApp />} />
          <Route path="/appointments" element={<ViewApp />} />
          <Route path="/progress" element={<TrackProg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
