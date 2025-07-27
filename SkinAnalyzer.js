import React, { useState, useEffect, useCallback } from "react";
import "./SkinAnalyzer.css";

const SkinAnalyzer = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState(null);
  const [skinType, setSkinType] = useState(null);
  const [concern, setConcern] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const fetchRecommendedProducts = useCallback(async () => {
    if (step !== 5 || !skinType || !concern) return;

    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const response = await fetch(
        `http://localhost:5000/api/recommendations?skinType=${encodeURIComponent(skinType)}&concern=${encodeURIComponent(concern)}`
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      data.message ? setError(data.message) : setProducts(data);
    } catch (err) {
      setError("Failed to fetch product recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [step, skinType, concern]);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item._id === product._id);

    if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="skin-analyzer-container">
      <div className="cart-icon">
        🛒 <span className="cart-count">{cartCount}</span>
      </div>

      {step === 1 && (
        <>
          <h1>Discover Your Perfect Skincare Routine</h1>
          <button className="get-started-button" color="ff4081" onClick={() => setStep(2)}>Get Started</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>What is your gender?</h2>
          <div className="options">
            <button className={gender === "Male" ? "selected" : ""} onClick={() => setGender("Male")}>Male</button>
            <button className={gender === "Female" ? "selected" : ""} onClick={() => setGender("Female")}>Female</button>
          </div>
          <button className="next-button" disabled={!gender} onClick={() => setStep(3)}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>What is your skin type?</h2>
          <div className="options">
            {["Dry", "Oily", "Normal", "Combination", "Sensitive"].map((type) => (
              <button key={type} className={skinType === type ? "selected" : ""} onClick={() => setSkinType(type)}>{type}</button>
            ))}
          </div>
          <button className="next-button" disabled={!skinType} onClick={() => setStep(4)}>Next</button>
        </>
      )}

      {step === 4 && (
        <>
          <h2>What is your primary skin concern?</h2>
          <div className="options">
            {["Acne", "Wrinkles and fine lines", "Dull skin", "Hyperpigmentation"].map((c) => (
              <button key={c} className={concern === c ? "selected" : ""} onClick={() => setConcern(c)}>{c}</button>
            ))}
          </div>
          <button className="next-button" disabled={!concern} onClick={() => setStep(5)}>See Recommendations</button>
        </>
      )}

      {step === 5 && (
        <>
          <h1>Recommended Skincare Products</h1>
          {loading && <p>Loading products...</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="product-list">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product">
                  <h2>{product.name}</h2>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <p>{product.description}</p>
                  <p className="product-price">Rs. {product.price}</p>
                  <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))
            ) : (
              !loading && !error && <p>No products found for your selection. Try different options!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SkinAnalyzer;
