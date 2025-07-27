import React, { useEffect, useState } from "react";
import "./DisplayOffer.css";

const DisplayOffer = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/offers") 
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error("Error fetching offers:", error));
  }, []);

  return (
    <div className="offer-container">
      <h2 className="offer-title">Available Offers</h2>
      {offers.length === 0 ? (
        <p className="no-offers">No offers available</p>
      ) : (
        <div className="offer-list">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p><strong>Discount:</strong> {offer.discount}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayOffer;
