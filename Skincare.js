import React from "react";
import { useNavigate } from "react-router-dom";
import "./Skincare.css";
import backgroundImage from "./images/bg.jpeg"; 

const Skincare = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Sun Care", query: "sun care" },
    { name: "Skincare", query: "skincare" },
    { name: "Body Care", query: "body care" },
    { name: "Hair Care", query: "hair care" }
  ];

  return (
    <div 
      className="skincare-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h1 className="slogan">"Glow Every Day with the Best Care!"</h1>
      <h2 className="shop-title">Shop by Category</h2>
      <p className="shop-description">
        Discover our premium beauty products tailored to your skincare, haircare, 
        and body care needs. Click on a category to explore!
      </p>

      <div className="category-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-box" 
            onClick={() => {
              console.log(`Navigating to /product-page?category=${encodeURIComponent(category.query)}`);
              navigate(`/product-page?category=${encodeURIComponent(category.query)}`);
            }}
          >
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skincare;
