// Callback Component
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Home from './Home';

const UninstallCallBack = () => {
    const { serviceId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    // update patient service status based on the status received in the URL
    // Implement the logic to update the patient service status
    // For example, you can use the status to update the patient service status in the database
    useEffect(() => {
        if (status === 'success') {
            // Update the patient service status to 'registered'
            // Implement the logic to update the patient service status
            console.log('Uninstall successful');
            fetch('http://localhost:5001/update_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patient_id: '1', is_registered: false, service_id: serviceId})
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error updating status:', error));

        } else {
            // Update the patient service status to 'failed'
            // Implement the logic to update the patient service status
            console.log('Uninstall failed');
        }
    }
    , [status, serviceId]);

    return (
        <React.Fragment>
            <Home />
                <div>
                    {status === 'success' ? <h1>Uninstall Successful</h1> : <h1>Uninstall Failed</h1>}
                </div>
        </React.Fragment>
    );
}

export default UninstallCallBack;