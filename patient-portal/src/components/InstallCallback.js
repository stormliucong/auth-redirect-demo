// Callback Component
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Home from './Home';

const InstallCallback = () => {
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
            console.log('Install successful');
            fetch('http://localhost:5001/update_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patient_id: '1', is_registered: true, service_id: serviceId})
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error updating status:', error));

        } else {
            // Update the patient service status to 'failed'
            // Implement the logic to update the patient service status
            console.log('Install failed');
        }
    }
    , [status, serviceId]);

    return (
        <React.Fragment>
            <Home />
                <div>
                    {status === 'success' ? <h1>Install Successful</h1> : <h1>Install Failed</h1>}
                </div>
        </React.Fragment>
    );
}

export default InstallCallback;