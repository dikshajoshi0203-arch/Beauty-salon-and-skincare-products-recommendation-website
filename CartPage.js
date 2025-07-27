import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storageListener = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
    };

    window.addEventListener("storage", storageListener);
    return () => window.removeEventListener("storage", storageListener);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/checkout");
    } else {
      alert("Please log in to proceed with checkout.");
      navigate("/login");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button className="shop-button" onClick={() => navigate("/")}>
              Go to Shop
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-image" />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p className="cart-description">{item.description}</p>
                    <p className="cart-price">Price: ₹{item.price.toFixed(2)}</p>

                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => decreaseQuantity(item._id)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => increaseQuantity(item._id)}>+</button>
                    </div>

                    <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
