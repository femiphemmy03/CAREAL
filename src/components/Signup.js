import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password) {
      onSignup();
      alert("Account created successfully!");
      navigate("/register");
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="page-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit" className="submit-btn">Create Account</button>
      </form>
      <p>Already have an account? <span className="link" onClick={() => navigate("/login")}>Login</span></p>
    </div>
  );
}

export default Signup;
