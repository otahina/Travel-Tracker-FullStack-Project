import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import './App.css';

const Content = () => {
  const location = useLocation();

  return (
    <div className="content">
      {location.pathname === '/' && (
        <div className="sidebar">
          {/* Sidebar Content */}
          <button>Mark the Country</button>
          <button>Unmark the Country</button>
          <button>Save</button>
          <p>The number of countries you have visited</p>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<MapComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null); // Store user data here

  const handleLogin = (email, password) => {
    // Code to authenticate user goes here
    fetch('http://localhost:8000/users/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        // Assuming data.user contains the user information
        setUser(data.user);
      });
  };

  return (
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
                    <span>{user.username}</span>
                    <img src={user.icon} alt="User Icon" />
                  </>
                ) : (
                  <span>Guest</span>
                )}
              </div>
            </div>
        </header>
        <Content user={user} handleLogin={handleLogin} />
      </Router>
    </div>
  );
};

export default App;
