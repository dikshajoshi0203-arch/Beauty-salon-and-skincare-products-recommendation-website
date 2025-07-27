import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./NailServices.css";
import Nail1 from "./images/Nail1.png";
import Nail2 from "./images/Nail2.jpg";
import Nail3 from "./images/Nail3.jpg";
import Nail4 from "./images/Nail4.jpg";
import Nail5 from "./images/Nail5.jpg";
import Nail6 from "./images/Nail6.jpg";
import Nail7 from "./images/Nail7.jpg";
import Nail8 from "./images/Nail8.jpg";
import Nail9 from "./images/Nail9.jpg";
import Nail10 from "./images/Nail10.jpg";

const NailServices = () => {
  const navigate = useNavigate(); 

  const nailServices = [
    { id: 1, name: "Gel Nails Extension", description: "Nail extensions with gel.", price: "₹2,120", image: Nail1 },
    { id: 2, name: "Gel Nail Removal", description: "Safe gel nail removal.", price: "₹320", image: Nail2 },
    { id: 3, name: "French Polish", description: "Classic French manicure.", price: "₹380", image: Nail3 },
    { id: 4, name: "Gel Nail Polish", description: "Glossy, durable gel polish.", price: "₹680", image: Nail4 },
    { id: 5, name: "Get Nailed (Cut, File & Polish)", description: "Basic nail care.", price: "₹340", image: Nail5 },
    { id: 6, name: "French Gel Polish", description: "French gel manicure.", price: "₹450", image: Nail6 },
    { id: 7, name: "Nail Art", description: "Custom nail designs.", price: "₹1,000", image: Nail7 },
    { id: 8, name: "Acrylic Nails", description: "Strong acrylic nails.", price: "₹1,500", image: Nail8 },
    { id: 9, name: "Spa Manicure", description: "Relaxing spa manicure.", price: "₹800", image: Nail9 },
    { id: 10, name: "Paraffin Wax Treatment", description: "Softens hands with wax.", price: "₹600", image: Nail10 },
  ];

  const handleBookNow = (serviceName) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="nail-services-container">
      <h2>Nail Services</h2>
      <div className="services-grid">
        {nailServices.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className="price">{service.price}</div>
            <div className="service-buttons">
              <button className="book-button" onClick={() => handleBookNow(service.name)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NailServices;
