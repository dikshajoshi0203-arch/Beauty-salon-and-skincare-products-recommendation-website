const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./database");

dotenv.config();

const app = express();

connectDB()
  .then(() => console.log("Database connected!"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const imagesPath = path.join(__dirname, "images");
app.use("/images", express.static(imagesPath));

const productRoutes = require("./routes/productRoutes");
const recommendationsRoutes = require("./routes/recommendations");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/products", productRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
