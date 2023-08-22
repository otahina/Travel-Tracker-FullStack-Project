import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import './App.css';

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
        <div className="content">
          <div className="sidebar">
            {/* Sidebar Content */}
            <button>Mark the Country</button>
            <button>Unmark the Country</button>
            <button>Save</button>
            <p>The number of countries you have visited</p>
          </div>
          <Routes>
            <Route exact path="/" element={<MapComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
