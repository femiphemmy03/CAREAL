import React from "react";
import Navbar from "./Navbar.js";
import "./Header.css";
const logo = "/images/Careal-logo-2.png"

function Header() {
  return (
    <>  
        <div className="header">
            <img src={logo} alt="Careal logo" className = "logo-img" />
            <h3>Careal</h3>
            <Navbar />
        </div>
    </>
  )
}

export default Header
