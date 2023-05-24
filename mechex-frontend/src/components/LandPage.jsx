import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Landpage.css'

function LandPage() {
    return (
        <div>
            <div className="flex-container1">
                <div className="flexitem3">
                    <div className="flexitem6">Welcome to MechEx!</div>
                    <div className="flexitem7">We are your one stop shop for connecting with Mechanics in Nigeria! Sign up or Login below.</div>
                </div>
            </div>
            <div className="subhead">Join the Family Below!</div>
            <div className="flex-container3">
                <div> 
                <Link to="/login">Login Here!</Link>
                </div>
                <div> 
                <Link to="/signup">Sign up for users</Link>
                </div>
                <div>
                <Link to="/signups">Sign up for mechanics </Link>
                </div>
            </div>
            <div className="mid-header">This is an inspiring quote, or a testimonial from a customer. Maybe its just filling up
                space or maybe people will actually read it. Who knows? All i know is that it looks nice
                <div id="quote">-Thor, God of Thunder</div>
            </div>
            <div className="footer">
                <footer> Chinelo Nwobbi, 19100111211</footer>
            </div>
        </div>
    );
}

export default LandPage;