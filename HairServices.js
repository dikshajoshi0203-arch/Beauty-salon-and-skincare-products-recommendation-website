import React from "react";
import { useNavigate } from "react-router-dom";
import "./HairServices.css";
import Hair1 from "./images/Hair1.jpg";
import Hair2 from "./images/Hair2.jpg";
import Hair3 from "./images/Hair3.jpg";
import Hair4 from "./images/Hair4.jpg";
import Hair5 from "./images/Hair5.jpg";
import Hair6 from "./images/Hair6.jpg";
import Hair7 from "./images/Hair7.jpg";
import Hair8 from "./images/Hair8.jpg";
import Hair9 from "./images/Hair9.jpg";
import Hair10 from "./images/Hair10.jpg";

const HairServices = () => {
  const navigate = useNavigate();

  const hairServices = [
    { id: 1, name: "Haircut & Styling", description: "Trendy and classic haircuts tailored to your style.", price: "₹1,200", image: Hair1 },
    { id: 2, name: "Hair Coloring", description: "Vibrant colors to enhance your look.", price: "₹2,500", image: Hair2 },
    { id: 3, name: "Keratin Treatment", description: "Smooth and strengthen your hair.", price: "₹4,000", image: Hair3 },
    { id: 4, name: "Hair Spa", description: "Relax and rejuvenate your scalp and hair with a nourishing spa.", price: "₹1,500", image: Hair4 },
    { id: 5, name: "Hair Straightening", description: "Get sleek, straight hair with our advanced treatments.", price: "₹3,500", image: Hair5 },
    { id: 6, name: "Hair Highlights", description: "Add dimension and depth with perfectly placed highlights.", price: "₹2,800", image: Hair6 },
    { id: 7, name: "Hair Smoothening", description: "Tame unruly hair with a smoothening treatment for long-lasting results.", price: "₹3,200", image: Hair7 },
    { id: 8, name: "Bridal Hair Styling", description: "Elegant and stunning hairstyles for your special day.", price: "₹4,500", image: Hair8 },
    { id: 9, name: "Permanent Curls", description: "Get long-lasting, bouncy curls with professional curling techniques.", price: "₹4,000", image: Hair9 },
    { id: 10, name: "Hair Extensions", description: "Add length and volume with premium-quality hair extensions.", price: "₹8,000", image: Hair10 },
  ];

  const handleBooking = (serviceName) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="hair-services-container">
      <h2>Hair Services</h2>
      <div className="services-grid">
        {hairServices.map((service) => (
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

export default HairServices;
