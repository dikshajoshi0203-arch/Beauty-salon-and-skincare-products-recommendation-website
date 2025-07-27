import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import BookingPage from "./BookingPage";
import Skincare from "./Skincare";
import NailServices from "./NailServices";
import HairServices from "./HairServices";
import FaceServices from "./FaceServices";
import BodyServices from "./BodyServices";
import SkinAnalyzer from "./SkinAnalyzer";
import AboutUs from "./AboutUs";
import AdminLogin from "./adminLogin";
import AdminDashboard from "./adminDashboard";
import BeautyHeaven from "./BeautyHeaven";
import NavBar from "./NavBar";
import ProductPage from "./ProductPage"; 
import CartPage from "./CartPage"; 
import Checkout from "./Checkout"; 
import Login from "./Login"; 
import Register from "./Register"; 
import UserDashboard from "./UserDashboard"; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(localStorage.getItem("isAdminAuthenticated") === "true");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      setIsAdminAuthenticated(localStorage.getItem("isAdminAuthenticated") === "true");
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAdminAuthenticated(false);
  };

  return (
    <Router>
      <NavBar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/skincare" element={<Skincare />} />
        <Route path="/nail-services" element={<NailServices />} />
        <Route path="/hair-services" element={<HairServices />} />
        <Route path="/face-services" element={<FaceServices />} />
        <Route path="/body-services" element={<BodyServices />} />
        <Route path="/skin-analyzer" element={<SkinAnalyzer />} />
        <Route path="/beauty-heaven" element={<BeautyHeaven />} />
        <Route path="/product-page" element={<ProductPage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/checkout" element={isAuthenticated ? <Checkout cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin-dashboard" 
          element={isAdminAuthenticated ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />} 
        />

        <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
