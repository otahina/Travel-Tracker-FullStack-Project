import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 

export const Login = ({ handleLogin }) => { // Receive handleLogin as a prop
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the handleLogin function passed down as a prop
    handleLogin(email, pass)
      .then(user => {
        if (user) {
          // Login was successful
          console.log('Logged in:', user);
          navigate("/");
        } else {
          // Login failed
          console.log('Login failed');
          // Optionally, show an error message to the user, etc.
        }
      });
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
          value={pass}
          type="password"
          placeholder="Type your password..."
          id="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <Link to="/register" className="link-btn">Don't have an account? Register here.</Link>
    </div>
  );
};
