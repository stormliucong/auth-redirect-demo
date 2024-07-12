// add a placeholder for the Home component
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Patient Portal Home</h1>
            {/* add navigate-to-service/1 */}
            <list>
                <li><a href="/navigate-to-service/1">Navigate to Service 1</a></li>
                <li><a href="/navigate-to-service/2">Navigate to Service 2</a></li>
            </list>
            
            
        </div>
    );
}

export default Home;