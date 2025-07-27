import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";

const categoryServices = {
  Face: [
    "Hydrating Facial", "Gold Facial", "Detan Treatment", "Eyebrows Threading",
    "Mask Treatment", "Bleach Treatment", "UpperLips & Chin Threading", "Bridal Makeup"
  ],
  Hair: [
    "Haircut & Styling", "Hair Coloring", "Keratin Treatment", "Hair Spa",
    "Hair Straightening", "Hair Highlights", "Hair Smoothening", "Bridal Hair Styling",
    "Permanent Curls", "Hair Extensions"
  ],
  Body: [
    "Waxing Hands", "Body Massage", "Aromatherapy Massage", "Foot Reflexology",
    "Paraffin Wax Treatment"
  ],
  Nails: [
    "Gel Nails Extension", "Gel Nail Removal", "French Polish", "Gel Nail Polish",
    "Get Nailed (Cut, File & Polish)", "French Gel Polish", "Nail Art",
    "Acrylic Nails", "Spa Manicure", "Paraffin Wax Treatment"
  ]
};

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const queryParams = new URLSearchParams(location.search);
  const selectedService = queryParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    service: selectedService,
    date: "",
    time: "",
  });

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (selectedService) {
      for (let category in categoryServices) {
        if (categoryServices[category].includes(selectedService)) {
          setFormData((prevData) => ({ ...prevData, category }));
          break;
        }
      }
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "category" && { service: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.name,
          userEmail: formData.email,
          services: [formData.service],
          date: formData.date,
          time: formData.time,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking successful!");
        navigate("/"); // redirect after booking if needed
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Appointment</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Phone"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a Category</option>
          {Object.keys(categoryServices).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          disabled={!formData.category}
        >
          <option value="" disabled>Select a Service</option>
          {formData.category && categoryServices[formData.category].map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={currentDate}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          min="09:00"
          max="21:00"
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
