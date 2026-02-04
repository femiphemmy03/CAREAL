import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, mock authentication:
    if (formData.email && formData.password) {
      onLogin();
      alert("Login successful!");
      navigate("/register");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign up</span></p>
    </div>
  );
}

export default Login;
