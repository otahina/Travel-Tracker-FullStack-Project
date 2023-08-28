import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { getNames } from 'country-list';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import './App.css';
import UserContext from './UserContext';
import logoImage from './images/icon.png';
import UserIcon from './images/user-icon.png';
import Home from './images/home.png';

const Content = ({ visitedCountries, markCountry, saveVisitedCountries, showRegisterMessage, activeButton,
  setActiveButton, homeCountry, setHomeCountry, isHomeCountrySaved, setIsHomeCountrySaved }) => {
  const location = useLocation();

  // Automatically populate countryOptions using the country-list package
  const countryNames = getNames();
  const countryOptions = countryNames.map((name) => ({ value: name, label: name }));

  // For home country
  const saveHomeCountryToDatabase = async () => {
    if (homeCountry) { // Check if a home country is selected
      try {
        const response = await fetch('http://localhost:8000/visited-countries/', {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ home_country: homeCountry.value }),
        });
        if (response.ok) {
          console.log('Home country saved successfully');
          setIsHomeCountrySaved(true); // Set state to true
        } else {
          console.log('Failed to save home country');
          setIsHomeCountrySaved(false);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    }
  };

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
          <p>The number of countries you have visited is 0 out of 195</p>
          <div className="home-country-container">
            <div className="home-country-header">
              <p className="home-country-text">Your Home Country</p>
              <img src={Home} alt="Home" className="home-country-image" />
            </div>
            <div className="home-country-selection">
              <Select
                value={homeCountry}
                onChange={(selectedOption) => setHomeCountry(selectedOption)}
                options={countryOptions}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    fontSize: '20px',
                    color: state.isSelected ? 'white' : 'black',  // Change text color
                    backgroundColor: state.isSelected ? 'blue' : 'none', // Change background color on selection
                  }),
                  control: (provided) => ({
                    ...provided,
                    height: '55px',
                    width: '170px',
                    padding: '0',
                    left: '-13px'
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    top: '-10px',
                    left: '-20px'
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    alignItems: 'center',
                    marginTop: '-27px'
                  }),
                  // style for list
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: '60px', // set max height
                    overflowY: 'auto', // add scroll if needed
                    width: '170px'
                  }),
                }}
              />
              <button onClick={saveHomeCountryToDatabase}>Save</button>
            </div>
          </div>
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
  /// For home country
  const [homeCountry, setHomeCountry] = useState(null);
  const [isHomeCountrySaved, setIsHomeCountrySaved] = useState(false);

  // Fetch Home Country from Database
  const fetchHomeCountry = async () => {
    try {
      const response = await fetch('http://localhost:8000/visited-countries/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setHomeCountry({ value: data.home_country, label: data.home_country });
      setIsHomeCountrySaved(true);  // Set the flag as true
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

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
        console.log('Visited Countries as Set:', visitedCountries); // For debug
        // Convert the set of visited countries to an array
        const countryArray = Array.from(visitedCountries); // FUr debug
        console.log('Visited Countries as Array:', countryArray);
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
    // For retrieving the visited countries from the backend
    const fetchVisitedCountries = async () => {
      if (user) {
        try {
          const response = await fetch('http://localhost:8000/visited-countries/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`,
            },
          });
          const data = await response.json();
          const countrySet = new Set(data.map(item => item.country_name));
          setVisitedCountries(countrySet);
        } catch (error) {
          console.log('An error occurred:', error);
        }
      }
    };
    if (user) {
      resetState();
      setShowRegisterMessage(false);
      fetchVisitedCountries();
      fetchHomeCountry();
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
                    <img src={UserIcon} alt="User" id="user-icon" />
                  </>
                ) : (
                  <>
                    <span id="guest">Guest</span>
                    <img src={UserIcon} alt="User" id="user-icon" />
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
            homeCountry={homeCountry}
            setHomeCountry={setHomeCountry}
            isHomeCountrySaved={isHomeCountrySaved}
            setIsHomeCountrySaved={setIsHomeCountrySaved}
          />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;

