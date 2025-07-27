const express = require("express");
const Product = require("../models/Product"); 

const User = require("../models/User");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const newUsers = await User.countDocuments({
      createdAt: { $gte: new Date().setDate(new Date().getDate() - 7) },
    });
    const bookings = await Appointment.find().sort({ date: -1 }).limit(10);

    res.json({ totalProducts, newUsers, bookings });
  } catch (error) {
    console.error(" Error fetching dashboard stats:", error);
    res.status(500).json({ totalProducts: 0, newUsers: 0, bookings: [] });
  }
});

router.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error(" Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/services", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({ name, description, price, category });
    await newService.save();
    res.status(201).json({ message: "Service added successfully!" });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/services/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found!" });
    }
    res.json({ message: "Service deleted successfully!" });
  } catch (error) {
    console.error(" Error deleting service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
