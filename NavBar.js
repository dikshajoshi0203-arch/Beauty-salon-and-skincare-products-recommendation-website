import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon"; // Import CartIcon

import "./NavBar.css";

const NavBar = ({ isAuthenticated, onLogout }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.reduce((total, item) => total + item.quantity, 0));
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount); // Sync cart count across tabs

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-logo">BEAUTY HEAVEN</div>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/skincare">SKINCARE PRODUCTS</Link></li>
        <li><Link to="/skin-analyzer">SKIN ANALYZER</Link></li>
        <li><Link to="/about-us">ABOUT</Link></li>
        <li>
          {isAuthenticated ? (
            <button className="nav-button" onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login" className="nav-button" color="ff4081">Login</Link>
          )}
        </li>
        <li>
          <CartIcon cartCount={cartCount} />
        </li>
        {isAuthenticated && (
          <li>
          

          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
