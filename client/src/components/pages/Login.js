import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} required />

        <button className="submit-btn">Login</button>
      </form>
      <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign up</span></p>
    </div>
  );
}

export default Login;

