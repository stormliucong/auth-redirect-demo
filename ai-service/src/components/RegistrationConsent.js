// src/components/RegistrationConsent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const RegistrationConsent = () => {
    const [callbackUrl, setCallbackUrl] = useState('');

    useEffect(() => {
        // Extract the callbackUrl from the URL query parameters
        const params = new URLSearchParams(window.location.search);
        setCallbackUrl(params.get('callbackUrl'));
    }, []);

    const serviceAppUrl = `http://localhost:5000`;
    const handleConsent = () => {
        // Post to the Service App backend on consent
        fetch(`${serviceAppUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ callbackUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                // Redirect to the callback URL with a success status
                window.location.href = `${callbackUrl}?status=success`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally handle errors differently or redirect with a failure status
            // window.location.href = `${callbackUrl}?status=failure`;
        });
    };

    return (
        <React.Fragment>
            <Home />
            <div>
                <h1>Registration and Consent</h1>
                <button onClick={handleConsent}>Give Consent</button>
            </div>
        </React.Fragment>
    );
}

export default RegistrationConsent;
