import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <header className="app-header">
        <h1>GlobeMarks: Where Have You Been in the World?</h1>
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
      <Routes>
        <Route exact path="/" element={<MapComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
