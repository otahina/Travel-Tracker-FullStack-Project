import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from '../UserContext';

export const Login = () => {
  const [username, setUsername] = useState(""); // Change email to username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }), // Send username and password directly
      });

      if (!response.ok) {
        console.log('Error with fetch:', response.status, response.statusText);
        console.log('Login failed');
        return;
      }

      const data = await response.json();
      console.log(data)
      localStorage.setItem('token', data.token);
      setUser(data.user); // Assuming `data.user` contains the user's information
      console.log('Logged in:', data);
      navigate("/"); // Redirect to home page
      
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          placeholder="Type your username..."
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          placeholder="Type your password..."
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <Link to="/register" className="link-btn">Don't have an account? Register here.</Link>
    </div>
  );
};

