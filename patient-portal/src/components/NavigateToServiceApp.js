// React Component to Navigate to Service App
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';

const NavigateToServiceApp = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const location = useLocation();
    useEffect(() => {
        // Check if the registration status is in the URL query params
        const query = new URLSearchParams(location.search);
        const status = query.get('status');
        if (status === 'success') {
            setIsRegistered(true);
        }
    }, [location]);

    const handleNavigate = () => {
        const callbackUrl = `${window.location.origin}/navigate-to-service`;
        const serviceAppUrl = `http://localhost:3000`;
        console.log('callbackUrl:', callbackUrl);
        const serviceAppRegisterUrl = `${serviceAppUrl}/register?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        window.open(serviceAppRegisterUrl, '_self');  // Opens in the same tab or specify '_blank' for a new tab
    };

    const handleUseService = () => {
        console.log('Using the service...');
        // Implement the action to use the service
    };

    return (
        <React.Fragment>
            <Home />
            <div>
            {isRegistered ? (
                <div>
                    <button onClick={handleUseService}>Use Service</button>
                </div>
            ) : (
                <button onClick={handleNavigate}>Register on Service App</button>
            )}
        </div>
        </React.Fragment>
    );
}

export default NavigateToServiceApp;
