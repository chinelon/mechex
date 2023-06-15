//this will allow users and mechanics to log in
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
 import '/Users/laurennwobbi/mechEx/mechex-frontend/src/assets/Booking.css'
function Login({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if login was successful
    try {
      const response = await axios.post('http://localhost:5001/login', { email, password });
      console.log(response.data);
      const {success, userType, sessionIdentifier, mechanic_id, user_id } = response.data;

      if (success) {
        // Store the session identifier/token in local storage
        localStorage.setItem('session', sessionIdentifier);
        // Call the onLogin prop with the session identifier
        onLogin(sessionIdentifier, user_id, mechanic_id);
        console.log(user_id)
        console.log(mechanic_id)
        // Login successful, redirect to the appropriate page
        if (userType === 'customer') {
          // Redirect to customer page
          navigate('/dashboard');
        } else if (userType === 'mechanic') {
          // Redirect to mechanic page
          navigate('/dashboards');
        }
      } else {
        // Login failed
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error
    }
  };



  return (
    <div className="form-columnss">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">     Email:</label>
          <input
            type="email"
            id="email"
            placeholder='chinelo@yahoo.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='******'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className ="submits-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;