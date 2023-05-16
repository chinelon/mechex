import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
                </div>
            </div>
        </nav>

    );
}

export default Navbar;

