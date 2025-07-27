import React from "react";
import { useNavigate } from "react-router-dom";
import "./FaceServices.css";
import Face1 from "./images/Face.jpg";
import Face2 from "./images/Face2.jpg";
import Face3 from "./images/Face3.jpg";
import Face4 from "./images/Face4.jpg";
import Face5 from "./images/Face5.jpg";
import Face6 from "./images/Face6.jpg";
import Face7 from "./images/Face7.jpg";
import Face8 from "./images/Face8.jpg";

const FaceServices = () => {
  const navigate = useNavigate();

  const faceServices = [
    { id: 1, name: "Hydrating Facial", description: "Deep hydration for dry and tired skin.", price: "₹2,800", image: Face1 },
    { id: 2, name: "Gold Facial", description: "Indulge in a luxurious gold-infused facial.", price: "₹5,000", image: Face2 },
    { id: 3, name: "Detan Treatment", description: "Remove tan and restore your skin’s natural glow.", price: "₹1,200", image: Face3 },
    { id: 4, name: "Eyebrows Threading", description: "Perfectly shape your eyebrows with threading.", price: "₹150", image: Face4 },
    { id: 5, name: "Mask Treatment", description: "Pamper your skin with a soothing mask.", price: "₹700", image: Face5 },
    { id: 6, name: "Bleach Treatment", description: "Lighten and brighten your facial hair with bleach.", price: "₹600", image: Face6 },
    { id: 7, name: "UpperLips & Chin Threading", description: "Precision threading for perfectly shaped upper lips and chin.", price: "₹150", image: Face7 },
    { id: 8, name: "Bridal Makeup", description: "A luxurious bridal facial for a radiant, wedding-day glow.", price: "₹5,000", image: Face8 },
  ];

  const handleBooking = (serviceName) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="face-services-container">
      <h2>Face Services</h2>
      <div className="services-grid">
        {faceServices.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className="price">{service.price}</div>
            <button className="book-button" onClick={() => handleBooking(service.name)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaceServices;
