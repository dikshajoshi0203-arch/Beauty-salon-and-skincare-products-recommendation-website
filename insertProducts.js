const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  });

const products = [
  { name: "Tea Tree Acne Cleanser", image: "tea.jpg", description: "Reduces acne and controls oil.", price: 899, category: "Skincare", skinType: "Dry", concern: "Acne" },
  { name: "Gentle Acne Face Wash", image: "gentle.png", description: "Hydrates and fights acne.", price: 799, category: "Skincare", skinType: "Dry", concern: "Acne" },
  { name: "Hydrating Acne Serum", image: "hydrating.png", description: "Moisturizes while treating acne.", price: 999, category: "Skincare", skinType: "Dry", concern: "Acne" },
  { name: "Salicylic Acid Spot Treatment", image: "salicylic.jpg", description: "Reduces acne inflammation.", price: 699, category: "Skincare", skinType: "Dry", concern: "Acne" },
  { name: "Oil Control Gel", image: "oil.jpg", description: "Regulates sebum and prevents acne.", price: 899, category: "Skincare", skinType: "Oily", concern: "Acne" },
  { name: "Mattifying Acne Serum", image: "mattifying.jpg", description: "Controls oil and fights breakouts.", price: 999, category: "Skincare", skinType: "Oily", concern: "Acne" },
  { name: "Clay Mask for Acne", image: "clay.jpg", description: "Absorbs excess oil and unclogs pores.", price: 799, category: "Skincare", skinType: "Oily", concern: "Acne" },
  { name: "Acne Clearing Toner", image: "acne.jpg", description: "Minimizes pores and calms skin.", price: 899, category: "Skincare", skinType: "Oily", concern: "Acne" },
  { name: "Balancing Toner", image: "balancing.jpg", description: "Balances oil and hydration.", price: 899, category: "Skincare", skinType: "Combination", concern: "Acne" },
  { name: "Acne Defense Face Mask", image: "acne1.jpg", description: "Soothes irritation and prevents breakouts.", price: 999, category: "Skincare", skinType: "Combination", concern: "Acne" },
  { name: "Tea Tree Spot Treatment", image: "tea1.jpg", description: "Targets acne spots effectively.", price: 799, category: "Skincare", skinType: "Combination", concern: "Acne" },
  { name: "Clarifying Gel Cleanser", image: "clarifying.jpg", description: "Gently cleanses and purifies skin.", price: 699, category: "Skincare", skinType: "Combination", concern: "Acne" },
  { name: "Gentle Acne Moisturizer", image: "gentle1.jpg", description: "Lightweight hydration for sensitive skin.", price: 899, category: "Skincare", skinType: "Sensitive", concern: "Acne" },
  { name: "Soothing Acne Serum", image: "soothing.jpg", description: "Calms redness and breakouts.", price: 999, category: "Skincare", skinType: "Sensitive", concern: "Acne" },
  { name: "Chamomile Face Wash", image: "chamomile.jpeg", description: "Gently cleanses acne-prone sensitive skin.", price: 799, category: "Skincare", skinType: "Sensitive", concern: "Acne" },
  { name: "Aloe Vera Spot Gel", image: "aloe.jpg", description: "Soothes and heals acne spots.", price: 699, category: "Skincare", skinType: "Sensitive", concern: "Acne" },
];

Product.insertMany(products)
  .then(() => {
    console.log(" Products inserted successfully.");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(" Error inserting products:", err);
    mongoose.connection.close();
  });
