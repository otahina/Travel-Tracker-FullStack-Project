import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import './App.css';
import UserContext from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const Content = ({ isMarkingMode, toggleMarkingMode }) => { // Added props
  const location = useLocation();

  return (
    <div className="content">
      {location.pathname === '/' && (
        <div className="sidebar">
        {/* Sidebar Content */}
        <button
          onClick={toggleMarkingMode} // Using the prop
          style={{ backgroundColor: isMarkingMode ? 'orange' : 'initial' }} // Using the prop
        >
          Mark the Country
        </button>
        <button>Unmark the Country</button>
        <button>Save</button>
        <p>The number of countries you have visited</p>
      </div>
      )}
      <Routes>
        <Route exact path="/" element={<MapComponent isMarkingMode={isMarkingMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isMarkingMode, setIsMarkingMode] = useState(false);

  const toggleMarkingMode = () => {
    setIsMarkingMode(!isMarkingMode);
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
          <Content isMarkingMode={isMarkingMode} toggleMarkingMode={toggleMarkingMode} /> {/* Passed props */}
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
