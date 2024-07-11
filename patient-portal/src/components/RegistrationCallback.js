// Callback Component
import React from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';

const RegistrationCallback = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    return (
        <React.Fragment>
            <Home />
                <div>
                    {status === 'success' ? <h1>Registration Successful</h1> : <h1>Registration Failed</h1>}
                </div>
        </React.Fragment>
    );
}

export default RegistrationCallback;
