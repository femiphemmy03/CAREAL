import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Receive UserForm info
app.post("/api/users", (req, res) => {
  const { plateNumber } = req.body;

  if (!plateNumber) {
    return res.status(400).json({ message: "Plate number is required." });
  }

  console.log("📩 Received user info:", req.body);

  res.status(200).json({
    message: "✅ Backend: User info received successfully!",
    data: req.body,
  });
});

// ✅ Health check
app.get("/", (req, res) => res.send("🚗 CAREAL Backend Running Successfully!"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
