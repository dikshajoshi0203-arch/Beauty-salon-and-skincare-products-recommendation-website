const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(" Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.trim().toLowerCase();
    const products = await Product.find({ category: { $regex: new RegExp(`^${category}$`, "i") } });

    res.json(products);
  } catch (error) {
    console.error(" Error fetching category products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const total = await Product.countDocuments();
    res.json({ total: total || 80 }); 
  } catch (error) {
    console.error("❌ Error fetching product count:", error);
    res.json({ total: 80 }); 
  }
});

module.exports = router;
