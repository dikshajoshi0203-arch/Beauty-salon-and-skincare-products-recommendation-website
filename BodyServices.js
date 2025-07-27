import React from "react";
import { useNavigate } from "react-router-dom";
import "./BodyServices.css";
import body1 from "./images/Body1.png";
import body2 from "./images/Body2.jpg";
import body3 from "./images/Body3.jpg";
import body4 from "./images/Body4.jpg";
import body5 from "./images/Body5.jpg";

const BodyServices = () => {
  const navigate = useNavigate();

  const bodyServices = [
    { id: 1, name: "Waxing Hands", description: "Smooth and hair-free hands with professional waxing.", price: "₹500", image: body1 },
    { id: 2, name: "Body Massage", description: "Relax your muscles with a rejuvenating body massage.", price: "₹1,200", image: body2 },
    { id: 3, name: "Aromatherapy Massage", description: "Experience relaxation with essential oil-infused massage.", price: "₹1,500", image: body3 },
    { id: 4, name: "Foot Reflexology", description: "Therapeutic foot massage to relieve tension and stress.", price: "₹800", image: body4 },
    { id: 5, name: "Paraffin Wax Treatment", description: "Deep moisturization and relaxation for your skin.", price: "₹600", image: body5 },
  ];

  const handleBooking = (serviceName) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="body-services-container">
      <h2>Body Services</h2>
      <div className="services-grid">
        {bodyServices.map((service) => (
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

export default BodyServices;
