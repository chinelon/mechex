import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Landpage.css';

// Import images/icons
import logo from '../assets/logo.png';
import userIcon from '../assets/user.jpg';
import mechanicIcon from '../assets/mechanc-icon.jpg';

function LandPage() {
  return (
    <div className="landing-page">

      <div className="content">
        <div className="title">
          <h1>Welcome to MechEx!</h1>
        </div>

        <div className="subtitle">
          <p>Your one-stop shop for connecting with mechanics in Nigeria.</p>
        </div>

        <div className="cta-buttons">
          <Link to="/login" className="cta-button">
            Login
          </Link>
          <Link to="/signup" className="cta-button">
            Mechanic SignUp
          </Link>
          <Link to="/signups" className="cta-button">
            User Signup
          </Link>
        </div>
      </div>

      <div className="testimonial">
        <div className="quote">
          "This platform helped me find the best mechanic in town. Highly recommended!"
          - Ifeoma Oki
          </div>
       
        <div className="quote">
          "This platform saved me thousands of naira by connecting me to the best mechanic in Lagos!"
          - Olisa Oka
          </div>
       
        <div className="quote">
          "This platform saved me so much time"
         - Bode Elliot
          </div>
        
      </div>

      <footer className="footer">
        &copy; 2023 MechEx. 19100111211
      </footer>
    </div>
  );
}

export default LandPage;
