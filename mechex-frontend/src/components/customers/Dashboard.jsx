import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const sessionIdentifier = localStorage.getItem('session');
    const navigate = useNavigate()
    if (!sessionIdentifier) {
        // Session identifier is not present, redirect to login page
        navigate('/login')
    }

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