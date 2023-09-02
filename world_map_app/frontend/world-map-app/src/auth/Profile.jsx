import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data
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
    <div>
      { userData ? (
        <>
          <h1>Profile</h1>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>First Name:</strong> {userData.first_name}</p>
          <p><strong>Last Name:</strong> {userData.last_name}</p>
        </>
      ) : (
        <p>You are a guest</p>
      )}
    </div>
  );
};

export default Profile;
