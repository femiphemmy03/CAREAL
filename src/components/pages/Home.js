import React from "react";
import "./Home.css";

function Home({ onGetStarted }) {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Welcome to Careal</h1>
        <p>
          Check your car registration status, renew documents, and manage all
          your vehicle paperwork in one simple platform.
        </p>
        <button onClick={onGetStarted} className="get-started-btn">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Home;
