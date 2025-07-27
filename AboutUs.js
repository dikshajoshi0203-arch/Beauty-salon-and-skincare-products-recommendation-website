import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
import beauty_salon from "./images/beauty_salon.jpg"; // ✅ Correct import

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-container full-window">
      {/* Header Section */}
      <header className="about-header">
        <h1>Welcome to Our Beauty Heaven</h1>
        <p>Your destination for premium beauty treatments and expert skincare product recommendations.</p>
      </header>

      {/* About Section */}
      <section className="about-content">
        <div className="about-image">
          <img src={beauty_salon} alt="Beauty Salon" /> {/* ✅ Corrected src */}
        </div>
        <div className="about-text">
          <h2>About Us</h2>
          <p>We provide top-notch beauty and skincare services, ensuring our clients leave feeling refreshed and confident.</p>
          <ul>
            <li>Professional skincare analysis</li>
            <li>Personalized beauty treatments</li>
            <li>Expert product recommendations</li>
            <li>Relaxing and luxurious ambiance</li>
          </ul>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="reasons">
          <div className="reason-card">
            <h3>Expert Consultation</h3>
            <p>We offer personalized skincare and beauty advice tailored to your needs.</p>
          </div>
          <div className="reason-card">
            <h3>Premium Products</h3>
            <p>Our product recommendations are backed by science and proven results.</p>
          </div>
          <div className="reason-card">
            <h3>Relaxing Ambiance</h3>
            <p>Enjoy a luxurious experience in a serene and beautiful setting.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <h2>Book Your Appointment Today</h2>
        <p>Let us help you achieve flawless skin and beauty confidence.</p>
        <button className="book-appointment" onClick={() => navigate("/booking")}>
          Book Now
        </button>
      </footer>
    </div>
  );
};

export default AboutUs;
