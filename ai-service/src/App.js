import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationConsent from './components/RegistrationConsent';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegistrationConsent />} />
                {/* Other routes */}
            </Routes>
    </Router>

  );
}

export default App;
