import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import './App.css';
import UserContext from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import logoImage from './images/icon.png'; 

const Content = ({ visitedCountries, markCountry, saveVisitedCountries, showRegisterMessage,  activeButton,
  setActiveButton  }) => { 
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
            onClick={() => {
              setActiveButton('save');
              saveVisitedCountries(); // Call the save function when clicking the save button
            }}
          >
            Save
          </button>
          {showRegisterMessage && (
            <p id="register-show-message">
              <Link id="link-to-register" to="/register">Register now</Link> to save your history
            </p>
          )}
          <p>The number of countries you have visited</p>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<MapComponent visitedCountries={visitedCountries} markCountry={markCountry} activeButton={activeButton} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

const App = () => {
  // For remembering user who is logging in
  const [user, setUser] = useState(null);
  // Use state to temporally store visited countries
  const [visitedCountries, setVisitedCountries] = useState(new Set());
  // For user not registered yet
  const [showRegisterMessage, setShowRegisterMessage] = useState(false); 
  // For clicked button
  const [activeButton, setActiveButton] = useState(null); 

  // country id as identifier, checks if it is already visited or not
  const markCountry = (countryId, activeButton) => {
    // Create the copy of set of visitied country for updating data
    const updatedVisitedCountries = new Set(visitedCountries);
    if (activeButton === 'mark') {
      if (updatedVisitedCountries.has(countryId)) {
        alert('This country is already marked!');
        return;
      }
      updatedVisitedCountries.add(countryId);
    } else if (activeButton === 'unmark') {
      updatedVisitedCountries.delete(countryId);
    }
    // Updating the state of visitedcountries with the set, updatedVisitedCountries
    setVisitedCountries(updatedVisitedCountries);
  };

  const saveVisitedCountries = async () => {
    if (user) {
      try {
        // Convert the set of visited countries to an array
        const countryArray = Array.from(visitedCountries);
  
        // Create a suitable structure for backend, e.g., an array of objects
        const countryData = countryArray.map(country => {
          return { country_name: country }; // Assuming country is a name or identifier you want to send
        });
  
        const response = await fetch('http://localhost:8000/visited-countries/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(countryData),
        });
        console.log(await response.json()); // For debug
        if (response.ok) {
          console.log('Countries saved successfully');
        } else {
          console.log('Failed to save countries');
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    } else {
      setShowRegisterMessage(true); // Show register message if not logged in
    }
  };  
  // after the user logs in for the first time, reset the page
  const resetState = () => {
    setVisitedCountries(new Set());
    setActiveButton(null);
  };
  
  useEffect(() => {
    if (user) {
      resetState();
      setShowRegisterMessage(false);
    }
    console.log('User state updated:', user);
  }, [user]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <header className="app-header">
            <Link to="/">
              <img src={logoImage} alt="GlobeMarks Logo" id="logo" />
            </Link>
            <h1><span className="main-title">GlobeMarks</span><span id="sub-title">Your Personalized World Exploring History</span></h1>
            <div className="navigation-container">
              <div className="navigation">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
              </div>
              <div className="user-info">
                {user ? (
                  <>
                    <span id="username">{user.username}</span>
                    <FontAwesomeIcon icon={faCircleUser} id="user_icon" />
                  </>
                ) : (
                  <>
                    <span>Guest</span>
                    <FontAwesomeIcon icon={faCircleUser} id="user_icon" />
                  </>
                )}
              </div>
            </div>
          </header>
          <Content 
          visitedCountries={visitedCountries} 
          markCountry={markCountry}
          saveVisitedCountries={saveVisitedCountries} 
          showRegisterMessage={showRegisterMessage}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;

