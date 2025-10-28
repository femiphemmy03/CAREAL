// backend/db.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "careal_db",
  password: process.env.DB_PASSWORD || "your_password",
  port: process.env.DB_PORT || 5432,
});

// Test the connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default pool;
