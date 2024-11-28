import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VenuePage from './pages/VenuePage';
import UserPage from './pages/UserPage';
import VenueManagerPage from './pages/VenueManagerPage';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <div className="body-wrapper">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/venue/:id" element={<VenuePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/venue-manager" element={<VenueManagerPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
