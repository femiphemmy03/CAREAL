import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import "./App.css";

function App() {
  const handleAuthSubmit = (formData, isLogin) => {
    console.log(isLogin ? "Logging in..." : "Registering...", formData);
    // Later: send to backend (Node/Firebase)
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<UserForm onSubmit={handleAuthSubmit} />} />
      </Routes>
    </Router>
  );
}

export default App;
