import React from 'react';
import '../styles.css';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const SuccessMessage = () => {
    return (
        <div className="success-message">
            <h2>Form Submitted Successfully!</h2>
            <p style={{ color: 'black' }}>We appreciate your contact. We'll get back to you as soon as possible.</p>
            <Link to="/">
                <IconButton color="primary" style={{ color: 'grey' }}>
                    <HomeIcon /> <b style={{ fontSize: '18px' }}>Back</b>
                </IconButton>
            </Link>
        </div>

    );
};

export default SuccessMessage;