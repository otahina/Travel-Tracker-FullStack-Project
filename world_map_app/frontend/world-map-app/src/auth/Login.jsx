import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }), // Send email and password directly
      });

      if (!response.ok) {
        // Log the status and status text for more information
        console.log('Error with fetch:', response.status, response.statusText);
        // Handle login failure
        console.log('Login failed');
        return;
      }
  
      const data = await response.json();
      console.log('Logged in:', data);
      navigate("/"); // Redirect to home page
    } catch (error) {
      // Log any exceptions that occurred during the fetch
      console.log('An error occurred:', error);
    }
  };  

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="email"
          placeholder="Type your email address..."
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
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



