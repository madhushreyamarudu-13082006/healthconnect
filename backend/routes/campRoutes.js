const express = require("express");

const router = express.Router();

const camps = [
  {
    id: 1,
    name: "General Health Checkup",
    location: "Chennai",
    date: "15 September 2026",
    slots: 50
  },
  {
    id: 2,
    name: "Dental Health Camp",
    location: "Coimbatore",
    date: "20 September 2026",
    slots: 30
  },
  {
    id: 3,
    name: "Heart Health Camp",
    location: "Madurai",
    date: "25 September 2026",
    slots: 40
  }
];

router.get("/", (req, res) => {
  res.json({
    success: true,
    camps: camps
  });
});

module.exports = router;