import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { SessionContext } from '/Users/laurennwobbi/mechEx/mechex-frontend/src/App.jsx';


function Sidebar() {

    return (
        <nav>
            <div className="sidebars">
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/about">About</Link>
                    </div>
                    <div>
                        <Link to="/contact-us">Contact Us</Link>
                    </div>
            </div>
        </nav>

    );
}

export default Sidebar;

