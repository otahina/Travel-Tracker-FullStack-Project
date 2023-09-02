import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { getNames } from 'country-list';
import MapComponent from './MapComponent/MapComponent';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import './App.css';
import Modal from './Modal';
import UserContext from './UserContext';
import logoImage from './images/icon.png';
import UserIcon from './images/user-icon.png';
import Home from './images/home.png';
import Diary from './images/diary.png';

const Content = ({ visitedCountries, markCountry, saveVisitedCountries,showModal,setShowModal, activeButton,
  setActiveButton, homeCountry, setHomeCountry, visitedCountryCount, setIsHomeCountrySaved, user, }) => {
  const location = useLocation();

  // Automatically populate countryOptions using the country-list package
  const countryNames = getNames();
  const countryOptions = countryNames.map((name) => ({ value: name, label: name }));

  // For home country
  const saveHomeCountryToDatabase = async () => {
    if (user) {
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
      else {
        console.log('No home country selected');
      }
    }
    else {
      setShowModal(true);
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
          <Modal show={showModal} handleClose={() => setShowModal(false)}>
          <img src={Diary} alt="Diary" id="diary" />
            <h3 id="start-today">Start Today</h3>
            <div class="start-today-disc">
              <p>
              Don't put off your dreams for another day. With just a few clicks, you can begin your journey towards better self-awareness and growth. 
              Register now and make today the first day of the rest of your life.
                <Link id="link-to-register" to="/register">Register</Link> 
              </p>
              <p>Click the 'X' button to continue using the app as a guest.</p>
            </div>
          </Modal>
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
                    marginTop: '-15px',
                    color: state.isSelected ? 'white' : 'black',  // Change text color
                    backgroundColor: state.isSelected ? 'rgb(67, 144, 233)' : 'none', // Change background color on selection
                    fontSize: '16px',
                  }),
                  control: (provided) => ({
                    ...provided,
                    height: '45px',
                    width: '165px',
                    padding: '0',
                    left: '-30px'
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    top: '-15px',
                    left: '-25px'
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    alignItems: 'center',
                    marginTop: '-29px',
                    height: '80px',
                    left: '20px',
                    position: 'relative'
                  }),
                  // style for list
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: '40px', // set max height
                    overflowY: 'auto', // add scroll if needed
                    width: '170px',
                    left: '-25px',
                    paddingTop: '0px',
                    lineHeight: '0.8',
                    paddingBottom: '0px',
                  }),
                }}
              />
              <button className="home-save-button" onClick={saveHomeCountryToDatabase}>Save</button>
              {showModal && (
                <p className="register-show-message2">
                  <Link id="link-to-register" to="/register">Register now</Link> to save your history
                </p>
              )}
            </div>
          </div>
          <div className="count-country-container">
            <p>The number of countries you have visited is {visitedCountryCount} out of 195</p>
          </div>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<MapComponent visitedCountries={visitedCountries} markCountry={markCountry} activeButton={activeButton} homeCountry={homeCountry} />} />
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
  // For clicked button
  const [activeButton, setActiveButton] = useState(null);
  /// For home country
  const [homeCountry, setHomeCountry] = useState(null);
  const [isHomeCountrySaved, setIsHomeCountrySaved] = useState(false);
  // For counting visited countries
  const [visitedCountryCount, setVisitedCountryCount] = useState(0);
  // For showing error message
  const [showModal, setShowModal] = useState(false);

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
    setVisitedCountryCount(updatedVisitedCountries.size);
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
      setShowModal(true);
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
            user={user}
            visitedCountries={visitedCountries}
            markCountry={markCountry}
            saveVisitedCountries={saveVisitedCountries}
            showModal={showModal}
            setShowModal={setShowModal}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            homeCountry={homeCountry}
            setHomeCountry={setHomeCountry}
            isHomeCountrySaved={isHomeCountrySaved}
            setIsHomeCountrySaved={setIsHomeCountrySaved}
            visitedCountryCount={visitedCountryCount}
          />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;

