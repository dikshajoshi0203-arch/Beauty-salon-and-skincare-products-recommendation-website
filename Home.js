import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import homepage from "./images/homepage.jpg"; 
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Enhance Your Beauty and Uniqueness!!!</h1>
      <Link to="/booking">
        <button className="home-appointment-button">Book an Appointment</button>
      </Link>

      <h2 className="home-services-title">Services We Offer:</h2>
      <div className="home-services-grid">
        <Link to="/nail-services">
          <button className="home-service-button">NAIL</button>
        </Link>
        <Link to="/hair-services">
          <button className="home-service-button">HAIR</button>
        </Link>
        <Link to="/face-services">
          <button className="home-service-button">FACE</button>
        </Link>
        <Link to="/body-services">
          <button className="home-service-button">BODY</button>
        </Link>
      </div>

      <button className="admin-button" onClick={() => navigate("/admin-login")}>
        Admin
      </button>
    </div>
  );
};

export default Home;
