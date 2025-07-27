const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const { userEmail, userName, services, date, time } = req.body;

    console.log("Incoming booking request:", req.body); // Debug log

    if (!userEmail || !userName || !services || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({ message: "This slot is already booked." });
    }

    const newAppointment = new Appointment({
      userEmail,
      userName,
      services,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error(" Error booking appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
