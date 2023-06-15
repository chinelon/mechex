import React from 'react';
import { Link } from 'react-router-dom';
import ViewApps from './ViewApps';
import Sidebar from '../Sidebar';
import Nav from '../Nav';

function Dashboards() {

    return (
        <div className='dashboards'>
            <div class="sidebar">
                <Sidebar />
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