import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import "./Signup.css"

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    firstName: "",
    otherName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, otherName, lastName, email, password } = formData;

    if (firstName && otherName && lastName && email && password) {
      onSignup();
      alert("Account created successfully!");
      navigate("/register");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="page-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label>Other Name:</label>
        <input
          type="text"
          name="otherName"
          value={formData.otherName}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Create Account
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
