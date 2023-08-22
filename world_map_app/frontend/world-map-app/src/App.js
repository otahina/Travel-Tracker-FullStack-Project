import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import './App.css';

const Content = () => {
  const location = useLocation();
  const [user, setUser] = useState(null); // Store user data here

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
  return (
    <div className="App">
      <Router>
        <header className="app-header">
          <h1>GlobeMarks: Where Have You Been in the World?</h1>
          <div className="navigation">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </header>
        <Content />
      </Router>
    </div>
  );
};

export default App;
