import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import './App.css';
import UserContext from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const Content = ({ visitedCountries, markCountry }) => { // Removed unnecessary props
  const [activeButton, setActiveButton] = useState(null); // Added state inside Content
  const location = useLocation();

  return (
    <div className="content">
      {location.pathname === '/' && (
        <div className="sidebar">
          <button
            className={`button-mark ${activeButton === 'mark' ? 'active' : ''}`}
            onClick={() => setActiveButton('mark')}
          >
            Mark the Country
          </button>
          <button
            className={`button-mark ${activeButton === 'unmark' ? 'active' : ''}`}
            onClick={() => setActiveButton('unmark')}
          >
            Unmark the Country
          </button>
          <button
            className={`button-mark ${activeButton === 'save' ? 'active' : ''}`}
            onClick={() => setActiveButton('save')}
          >
            Save
          </button>
          <p>The number of countries you have visited</p>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<MapComponent visitedCountries={visitedCountries} markCountry={markCountry} activeButton={activeButton} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [visitedCountries, setVisitedCountries] = useState(new Set());

  // country id as identifier, checks if it is already visited or not
  const markCountry = (countryId) => {
    if (visitedCountries.has(countryId)) {
      alert('This country is already marked!');
      return;
    }
    setVisitedCountries(new Set([...visitedCountries, countryId]));
  };

  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <header className="app-header">
            <h1>GlobeMarks: Where Have You Been in the World?</h1>
            <div className="navigation-container">
              <div className="navigation">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </div>
              <div className="user-info">
                {user ? (
                  <>
                    <span id="username">{user.username}</span>
                    <FontAwesomeIcon icon={faCircleUser} id="user_icon" />
                  </>
                ) : (
                  <span>Guest</span>
                )}
              </div>
            </div>
          </header>
          <Content visitedCountries={visitedCountries} markCountry={markCountry} />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;

