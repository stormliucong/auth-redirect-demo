// Main App Component with Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigateToServiceApp from './components/NavigateToServiceApp';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/navigate-to-service" element={<NavigateToServiceApp />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}


export default App;
