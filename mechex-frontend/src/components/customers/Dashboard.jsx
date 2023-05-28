import React from 'react';
import { Link } from 'react-router-dom';


function Dashboard() {
    return (
        <div className='dashboard'>
            <div>
                <Link to="/booking">Book Appointment</Link>
            </div>
            <div>
                <Link to="/appointments">View Appointments</Link>
            </div>
            <div>
                <Link to="/progress">Track Progress</Link>
            </div>
        </div>
    );
}

export default Dashboard;