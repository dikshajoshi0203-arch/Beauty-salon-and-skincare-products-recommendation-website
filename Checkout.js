import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import "./Checkout.css";

const Checkout = ({ cart, setCart }) => {
  const [user, setUser] = useState({ name: "" });
  const [address, setAddress] = useState({
    building: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [showQR, setShowQR] = useState(false);
  const [upiLink, setUpiLink] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false); 

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleCheckout = () => {
    if (!user.name) {
      alert("Please enter your name.");
      return;
    }
    if (!address.building || !address.street || !address.city || !address.pincode) {
      alert("Please fill in all address fields.");
      return;
    }

    const merchantUPI = "kartikghuge2004@oksbi"; 
    const merchantName = "BeautyParlor"; 
    const transactionId = `TXN${Date.now()}`; 
    const transactionRef = `ORDER${Math.floor(Math.random() * 1000000)}`; 
    const transactionNote = "Beauty Parlor Order";
    const currency = "INR"; 
    const upiString = `upi://pay?pa=${merchantUPI}&pn=${merchantName}&tid=${transactionId}&tr=${transactionRef}&tn=${transactionNote}&am=${totalAmount}&cu=${currency}`;

    setUpiLink(upiString);
    setShowQR(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentConfirmed(true);
    setShowQR(false); 
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount}</p>

      {paymentConfirmed ? (
        <div className="thank-you-message">
          <h3>Thank you for confirming your order!</h3>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Building Name/Room No"
            value={address.building}
            onChange={(e) => setAddress({ ...address, building: e.target.value })}
          />
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          />

          <button onClick={handleCheckout}>Generate QR Code</button>

          {showQR && (
            <div className="qr-container">
              <h3>Scan to Pay</h3>
              <QRCodeCanvas value={upiLink} size={200} /> 
              <button onClick={handlePaymentSuccess}>Confirm Payment</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
