import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightbulbCircleOutlinedIcon from '@mui/icons-material/LightbulbCircleOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

function Sidebar() {

    return (
        <nav>
            <div className="sidebars">
                    <div>
                   <HomeOutlinedIcon style={{ color: '#6c798d' }}/>
                        <Link to="/"> Home</Link>
                    </div>
                    <div>
                        <LightbulbCircleOutlinedIcon style={{ color: '#6c798d' }} />
                        <Link to="/about">About</Link>
                    </div>
                    <div>
                        <ContactPageOutlinedIcon style={{ color: '#6c798d' }}/>
                        <Link to="/contact-us">Contact Us</Link>
                    </div>
            </div>
        </nav>

    );
}

export default Sidebar;

