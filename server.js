// server.js
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // load .env variables

const app = express();

// Middleware
app.use(express.json()); // parse JSON requests
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.send("Auth API running");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
