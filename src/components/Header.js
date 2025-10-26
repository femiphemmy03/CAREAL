import React from "react";
import Navbar from "./Navbar.js";
import "./Header.css";
const logo = "/images/img-1.jpg"

function Header() {
  return (
    <>  
        <div className="header">
            <img src={logo} alt="Careal logo" className = "logo-img" />
            <Navbar />
        </div>
    </>
  )
}

export default Header
