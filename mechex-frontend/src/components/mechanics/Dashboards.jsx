import React from 'react';
import { Link } from 'react-router-dom';


function Dashboards() {
    return (
        <div className='dashboard'>
            <div>
                <Link to="/appointments">View Appointments</Link>
            </div>
            <div>
                <Link to="/follow-up">Track Progress</Link>
            </div>
        </div>
    );
}

export default Dashboards;