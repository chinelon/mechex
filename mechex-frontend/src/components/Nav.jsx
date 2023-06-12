import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
//import { SessionContext } from '/Users/laurennwobbi/mechEx/mechex-frontend/src/App.jsx';


function Nav() {

    return (
        <nav>
            <div className="welcome">
                    <div>
                        <Link to="/booking">New App</Link>
                    </div>
                    <div>
                        <Link to="/progress">Track</Link>
                    </div>
            </div>
        </nav>

    );
}

export default Nav;

