import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { SessionContext } from '/Users/laurennwobbi/mechEx/mechex-frontend/src/App.jsx';


function Navbar() {
const handleLogout= () => {

}

    return (
        <nav>
            <div className="flex-container">
                <div className="flexitem1">Mech-Ex</div>
                <div className="flexitem2">
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/about">About</Link>
                    </div>
                    <div>
                        <Link to="/contact-us">Contact Us</Link>
                    </div>
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;

