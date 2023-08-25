import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from '../UserContext';

export const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  // For error for failing log in
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);

    try {
      const response = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }), // Send username and password directly
      });

      if (!response.ok) {
        setLoginError(true);
        console.log('Login failed');
        return;
      }

      const data = await response.json();
      console.log(data)
      localStorage.setItem('token', data.token);
      setUser(data.user); 
      console.log('Logged in:', data);
      navigate("/"); // Redirect to home page
      
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <div className="login-register-container">
      <div className="auth-form-container-login">
        <form className="login-form" onSubmit={handleSubmit}>
        {loginError && <div style={{ color: 'red' }}>Username or password is incorrect!</div>}
          <label htmlFor="username">Username</label>
          <input
            value={username}
            type="text"
            placeholder="Type your username..."
            className="username-reg"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            placeholder="Type your password..."
            className="password-reg"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-submit" type="submit">Log in</button>
        </form>
        <Link to="/register" className="link-btn">Don't have an account? Register here.</Link>
      </div>
    </div>
  );
};

