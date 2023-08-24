import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    fetch('http://localhost:8000/users/register/', {
      method: 'POST', // It sends a POST request to the server at the URL
      headers: {
        'Content-Type': 'application/json',
      },
      // Convert the user input into JSON string 
      body: JSON.stringify({ "email": email, "username": username, "password": password }), 
    })
      // response from the server and converts it from JSON into a JavaScript object.
      .then((response) => response.json()) 
      .then((data) => {
        console.log('Success:', data);
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error as needed
      });
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="email"
          placeholder="Type your email address..."
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">Username</label> {/* New input for username */}
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={confirmPassword}
          type="password"
          placeholder="Confirm your password..."
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="button-submit" type="submit">Register</button>
      </form>
    </div>
  );
};
