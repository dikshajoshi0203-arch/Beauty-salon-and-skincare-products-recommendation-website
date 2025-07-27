import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddService.css"; // Import the CSS file

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send data to the backend (you can replace this with an API call)
    const newService = { serviceName, description, price };
    console.log("Service Added:", newService);

    // Clear form fields after submission
    setServiceName("");
    setDescription("");
    setPrice("");

    // Redirect back to the admin dashboard after submission
    navigate("/admin-dashboard");
  };

  return (
    <div className="add-service-container">
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        <label>Service Name:</label>
        <input 
          type="text" 
          value={serviceName} 
          onChange={(e) => setServiceName(e.target.value)} 
          required 
        />

        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />

        <button type="submit" className="add-service-button">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
