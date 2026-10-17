const express = require("express");
const cors = require("cors");
require("dotenv").config();

const campRoutes = require("./routes/campRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "https://healthconnect-wine.vercel.app,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "HealthConnect Backend is running!"
  });
});

// Camps API
app.use("/api/camps", campRoutes);

// Registrations API
app.use("/api/registrations", registrationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`HealthConnect Backend running on port ${PORT}`);
});