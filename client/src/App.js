import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";
import UserForm from "./components/pages/UserForm"; // ✅ add this
import PaymentsDashboard from "./components/pages/PaymentsDashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-form" element={<UserForm />} /> {/* ✅ new route */}
        <Route path="/dashboard" element={<PaymentsDashboard />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
