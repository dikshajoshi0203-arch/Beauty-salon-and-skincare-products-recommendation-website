import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "./adminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 80, newUsers: 0, bookings: [] });
  const [services, setServices] = useState([
    { name: "Nails", description: "Nail Care Services", price: "500", category: "Nails" },
    { name: "Hair", description: "Hair Styling Services", price: "1000", category: "Hair" },
    { name: "Body", description: "Body Care & Massage", price: "1500", category: "Body" },
    { name: "Face", description: "Facial & Skin Care", price: "800", category: "Face" }
  ]);
  const [newService, setNewService] = useState({ name: "", description: "", price: "", category: "" });

  
  useEffect(() => {
    axios.get("/api/admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => setStats({ totalProducts: 80, newUsers: 0, bookings: [] }));
  }, []);

  
  const addService = async () => {
    if (!newService.name || !newService.price) return alert("Name & Price are required!");
    setServices([...services, newService]);
    setNewService({ name: "", description: "", price: "", category: "" });
  };

  
  const deleteService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Products</h2>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h2>New Users (Last 7 Days)</h2>
          <p>{stats.newUsers}</p>
        </div>
        <div className="stat-card">
          <h2>Recent Bookings</h2>
          <p>{stats.bookings.length}</p>
        </div>
      </div>


      
      <div className="manage-services">
        <h2>Manage Services</h2>

        
        <div className="add-service">
          <input type="text" placeholder="Service Name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
          <input type="text" placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          <input type="number" placeholder="Price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
          <select value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })}>
            <option value="">Select Category</option>
            <option value="Nails">Nails</option>
            <option value="Hair">Hair</option>
            <option value="Body">Body</option>
            <option value="Face">Face</option>
          </select>
          <button onClick={addService}>Add Service</button>
        </div>


        <div className="services-list">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>Price: ₹{service.price}</p>
              <button className="delete-btn" onClick={() => deleteService(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
