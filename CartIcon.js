import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartIcon.css";
import cartImage from "./images/add.jpg"; 

const CartIcon = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.reduce((total, item) => total + item.quantity, 0));
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <div className="cart-icon-container" onClick={() => navigate("/cart")}>
      <img src={cartImage} alt="Cart" className="cart-icon" />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  );
};

export default CartIcon;
