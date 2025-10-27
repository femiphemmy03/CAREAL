import express from "express";
import { frscVerify } from "../utils/frscCheck";

const router = express.Router();

// POST /api/verify-plate
router.post("/verify-plate", async (req, res) => {
  const { plateNumber } = req.body;

  if (!plateNumber) {
    return res.status(400).json({ status: "ERROR", message: "Plate number is required" });
  }

  try {
    const result = await frscVerify(plateNumber);
    res.json(result);
  } catch (error) {
    console.error("Error verifying plate number:", error);
    res.status(500).json({ status: "ERROR", message: "Internal server error" });
  }
});

export default router;