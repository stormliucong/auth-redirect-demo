// React Component to Navigate to Service App
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Home from './Home';

const NavigateToServiceApp = () => {
    const { serviceId } = useParams();  // Access serviceId from URL
    const patientId = '1';  // Placeholder for patientId
    const [serviceDetails, setServiceDetails] = useState({
        serviceAppAuthenticationUrl: '',
        serviceAppApiUrl: '',
        isRegistered: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get_status take a json post request with service_id, patient_id and return the service details
        const data = { patient_id: patientId, service_id: serviceId };
        const url = `http://localhost:5001/get_status`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setServiceDetails({
                    serviceAppAuthenticationUrl: data.serviceAppAuthenticationUrl,
                    serviceAppApiUrl: data.serviceAppApiUrl,
                    isRegistered: data.isRegistered
                });
                setLoading(false);
                console.log('Service details:', data);
            })
            .catch(error => {
                console.error('Error fetching service details:', error);
                setLoading(false);
            });
    }, [serviceId]);

    if (loading) {
        return <p>Loading...</p>;
    }


    const handleInstall = () => {
        const callbackUrl = `${window.location.origin}/install-callback/${serviceId}`;
        console.log('callbackUrl:', callbackUrl);
        const url = `${serviceDetails.serviceAppAuthenticationUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        console.log('url:', url);
        window.open(url, '_self');  // Opens in the same tab or specify '_blank' for a new tab
    };

    const handleUninstall = () => {
        const callbackUrl = `${window.location.origin}/uninstall-callback/${serviceId}`;
        console.log('callbackUrl:', callbackUrl);
        const url = `${serviceDetails.serviceAppAuthenticationUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        console.log('serviceAppUnregisterUrl:', url);
        window.open(url, '_self');  // Opens in the same tab or specify '_blank' for a new tab
    };

    const handleUseService = () => {
        console.log('Using the service...api endpoint is: ', serviceDetails.serviceAppApiUrl);
        window.location.href = serviceDetails.serviceAppApiUrl;
        // Implement the action to use the service
    };

    return (
        <React.Fragment>
            <Home />
            <div>This is Service App {serviceId}</div>
            <div>
            {serviceDetails.isRegistered ? (
                <div>
                <button onClick={handleUseService}>Use</button>
                <button onClick={handleUninstall}>Uninstall</button>
                </div>
            ) : (
                <button onClick={handleInstall}>Install</button>
            )}
            </div>
        </React.Fragment>
    );
}

export default NavigateToServiceApp;
