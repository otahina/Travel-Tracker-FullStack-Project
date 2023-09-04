import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/users/profile/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className="profile-container">
      { userData ? (
        <>
          <h1 className="profile-header">Profile</h1>
          <div className="profile-item">
            <strong>Username:</strong>
            <span>{userData.username}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong>
            <span>{userData.email}</span>
          </div>
          <div className="profile-item">
            <strong>First Name:</strong>
            <span>{userData.first_name}</span>
          </div>
          <div className="profile-item">
            <strong>Last Name:</strong>
            <span>{userData.last_name}</span>
          </div>
        </>
      ) : (
        <p>You are a guest</p>
      )}
    </div>
  );
};

export default Profile;

