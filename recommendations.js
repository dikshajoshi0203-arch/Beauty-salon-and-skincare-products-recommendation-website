const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const { skinType, concern } = req.query;

  if (!skinType || !concern) {
    return res.status(400).json({ message: "Missing skinType or concern" });
  }

  try {
    console.log(` Fetching recommendations for: SkinType: ${skinType}, Concern: ${concern}`);

    const skinTypeLower = skinType.toLowerCase();
    const concernLower = concern.toLowerCase();

    let products = await Product.find({
      skinType: skinTypeLower,
      concern: concernLower,
    }).limit(16);

    const productIds = new Set(products.map((p) => p._id.toString())); 

    if (products.length < 4) {
      console.warn(` Found only ${products.length} matching products. Fetching additional skincare items...`);

      const extraProducts = await Product.find({ category: "Skincare" })
        .limit(10) 
        .lean();

      for (const product of extraProducts) {
        if (productIds.size < 4 && !productIds.has(product._id.toString())) {
          productIds.add(product._id.toString());
          products.push(product);
        }
      }
    }

    if (products.length === 0) {
      return res.status(200).json({ message: "No products found. Please try different options." });
    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
    const selectedProducts = shuffleArray(products).slice(0, 4);

    console.log(` Returning ${selectedProducts.length} unique products.`);
    res.json(selectedProducts);
  } catch (error) {
    console.error(" Error fetching recommendations:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
