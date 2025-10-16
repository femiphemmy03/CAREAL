import express from "express";
import { frscVerify } from "../utils/frscCheck.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { plateNumber } = req.body;

  if (!plateNumber) {
    return res.status(400).json({ success: false, message: "Plate number required" });
  }

  try {
    const result = await frscVerify(plateNumber);
    return res.json({
      success: true,
      plateNumber,
      status: result.status,
      message: result.message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying plate number",
      error: error.message,
    });
  }
});

export default router;
