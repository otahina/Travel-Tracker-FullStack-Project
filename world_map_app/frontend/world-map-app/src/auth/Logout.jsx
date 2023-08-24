import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../UserContext';

export const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutFromServer = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          console.log('Logged out from server');
        } else {
          console.log('Failed to log out from server');
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    // Call the server's logout endpoint
    logoutFromServer();

    // Clear user information and token from context and local storage
    localStorage.removeItem('token');
    setUser(null);

    // Redirect to another page, such as the login page
    navigate("/login");
  }, [setUser, navigate]);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
};
