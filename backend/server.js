const express = require("express");
const cors = require("cors");
require("dotenv").config();

const campRoutes = require("./routes/campRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
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
  console.log(
    `HealthConnect Backend running on http://localhost:${PORT}`
  );
});