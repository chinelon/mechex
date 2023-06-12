import React from 'react';
import { Link } from 'react-router-dom';
import ViewApps from './ViewApps';
import Sidebar from '../Sidebar';
import Nav from '../Nav';

function Dashboards() {

    return (
        <div className='dashboard'>
            <div class="mdashboard">
                <Sidebar />
            </div>
            <div class="header">
                <Nav />
            </div>

            <div class="projects">
                <div>
                    <ViewApps />
                </div>
            </div>
        </div>
    );
}

export default Dashboards;