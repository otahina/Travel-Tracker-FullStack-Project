import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => { // You don't need handleLogin as a prop anymore
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/users/login/";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: pass }), // Use the pass variable here
    });

    // If the request was successful, return the user data or a success message
    if (response.ok) {
      const data = await response.json();

      // You can extract user information or other relevant details from data
      console.log('Logged in:', data);
      navigate("/");
    } else {
      // Handle login failure
      console.log('Login failed');
      // Optionally, show an error message to the user, etc.
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
