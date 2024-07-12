// Main App Component with Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigateToServiceApp from './components/NavigateToServiceApp';
import InstallCallback from './components/InstallCallback';
import UninstallCallback from './components/UninstallCallback';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/navigate-to-service/:serviceId" element={<NavigateToServiceApp />} />
                <Route path="install-callback/:serviceId" element={<InstallCallback />} />
                <Route path="uninstall-callback/:serviceId" element={<UninstallCallback />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}


export default App;
