// backend/routes/userRoutes.js
import express from "express";
const router = express.Router();

// POST /api/users — Save user info
router.post("/", (req, res) => {
  const { name, plateNumber } = req.body;

  console.log("✅ User received:", { name, plateNumber });

  if (!name || !plateNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Here you can save to DB if needed
  res.status(201).json({
    message: "User info received successfully",
    data: { name, plateNumber },
  });
});

export default router;
