// src/components/RegistrationConsent.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RegistrationConsent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [consentGiven, setConsentGiven] = useState(false);
    const [callbackUrl, setCallbackUrl] = useState('');
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setCallbackUrl(query.get('callbackUrl'));
    }, [location]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!consentGiven) {
            alert("You must agree to the consent before registering.");
            return;
        }

        try {
            const serviceAppFlaskUrl = `http://localhost:5000`;
            const response = await fetch(`${serviceAppFlaskUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, callbackUrl })
            });
            const data = await response.json();
            console.log('Registration response:', data);
            if ('redirect' in data && data.redirect){            
                window.location.href = `${callbackUrl}?status=success`;
            } else {
                alert('Registration failed:', data);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration Error:', error);
        }
    };

    return (
        <div>
            <h1>Registration and Consent</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="consentCheckbox">
                    <input
                        type="checkbox"
                        id="consentCheckbox"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                    />
                    I agree to the terms and conditions.
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationConsent;
