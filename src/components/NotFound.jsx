import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound__container">
            <div className="notfound__icontext">
                <FontAwesomeIcon icon={faFolderOpen} />
            </div>
            <p>Page Not Found, Return To <NavLink to="/" className="backToHome">Home</NavLink></p>
        </div>
    );
}
 
export default NotFound;