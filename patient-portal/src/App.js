// Main App Component with Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationCallback from './components/RegistrationCallback';
import NavigateToServiceApp from './components/NavigateToServiceApp';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/navigate-to-service" element={<NavigateToServiceApp />} />
                <Route path="/patient-callback" element={<RegistrationCallback />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}


export default App;
