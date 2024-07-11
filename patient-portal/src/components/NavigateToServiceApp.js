// React Component to Navigate to Service App
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const NavigateToServiceApp = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        const callbackUrl = `${window.location.origin}/patient-callback`;
        const serviceAppUrl = `http://localhost:3000`;
        console.log('callbackUrl:', callbackUrl);
        const serviceAppRegisterUrl = `${serviceAppUrl}/register?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        window.open(serviceAppRegisterUrl, '_self');  // Opens in the same tab or specify '_blank' for a new tab
    };

    return (
        <React.Fragment>
            <Home />
            <button onClick={handleNavigate}>Register on Service App</button>
        </React.Fragment>
    );
}

export default NavigateToServiceApp;
