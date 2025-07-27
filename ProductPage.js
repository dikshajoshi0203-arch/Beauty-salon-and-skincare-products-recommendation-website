import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";
import "./ProductPage.css";

const ProductPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const category = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("category")?.trim().toLowerCase() || "all";
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const encodedCategory = encodeURIComponent(category);
        const url =
          category !== "all"
            ? `http://localhost:5000/api/products/category/${encodedCategory}`
            : "http://localhost:5000/api/products";

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(" Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart([...cart]);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="product-container">
      <CartIcon />

      <h2>Best {category === "all" ? "All" : decodeURIComponent(category)} Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={`http://localhost:5000/images/${product.image.split("/").pop()}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="brand">{product.brand}</p>
                <p className="price">₹{product.price}</p>
                <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
