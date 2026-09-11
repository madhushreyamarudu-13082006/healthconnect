const express = require("express");
const db = require("../firebaseAdmin");

const router = express.Router();

// POST - Create registration
router.post("/", async (req, res) => {
  const {
    name,
    email,
    phone,
    age,
    gender,
    campId
  } = req.body;

  // Validation
  if (
    !name ||
    !email ||
    !phone ||
    !age ||
    !gender ||
    !campId
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all registration details."
    });
  }

  try {
    const registration = {
      name: name,
      email: email,
      phone: phone,
      age: age,
      gender: gender,
      campId: campId,
      registeredAt: new Date().toISOString()
    };

    // Save registration to Firestore
    const docRef = await db
      .collection("registrations")
      .add(registration);

    res.status(201).json({
      success: true,
      message: "Camp registration successful!",
      registration: {
        id: docRef.id,
        ...registration
      }
    });

  } catch (error) {
    console.error("Firestore error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save registration."
    });
  }
});


// GET - Get all registrations
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("registrations")
      .get();

    const registrations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      registrations: registrations
    });

  } catch (error) {
    console.error("Firestore error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations."
    });
  }
});


module.exports = router;