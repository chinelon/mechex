import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
import ViewApp from './ViewApp';
import TrackProg from './TrackProg'

const Dashboard = () => {
    const sessionIdentifier = localStorage.getItem('session');
    const navigate = useNavigate()
    if (!sessionIdentifier) {
        // Session identifier is not present, redirect to login page
        navigate('/login')
    }

    return (
        <div className='dashboard'>
            <div class="sidebar">
                <div>
                    <Sidebar />
                </div>
            </div>
            <div className="projects">
                <div>
                    <ViewApp />
                </div>
            </div>
            <div className="track">
                <div>
                    <TrackProg />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;