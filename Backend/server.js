import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { frscVerify } from "./utils/frscCheck.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/verifyplate", async (req, res) => {
  const { plateNumber } = req.body;

  if (!plateNumber) {
    return res.status(400).json({ message: "Plate number is required." });
  }

  try {
    const result = await frscVerify(plateNumber);
    console.log(" FRSC result:", result);

    res.status(200).json({
      message: result.message,
      status: result.status,
      make: result.make || "",
      color: result.color || "",
    });
  } catch (error) {
    console.error("❌ Verification error:", error.message);
    res.status(500).json({ message: "Server error during verification." });
  }
});
app.get("/", (req, res) => res.send("🚗 CAREAL Backend Running Successfully!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
