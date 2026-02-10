import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pages.css";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    otherName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );

      // ✅ Save token (login user)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect after login
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="page-container">
      <h2>Create Account</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input name="firstName" onChange={handleChange} required />

        <label>Other Name</label>
        <input name="otherName" onChange={handleChange} />

        <label>Last Name</label>
        <input name="lastName" onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button className="submit-btn">Create Account</button>
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
