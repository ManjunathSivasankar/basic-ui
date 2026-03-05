const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite)
      "https://ud-web1.netlify.app", // replace with your Netlify URL
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Prevent browser caching for API responses
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// Import Routes
const productRoutes = require("./routes/productRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running... MongoDB connection successful.");
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});