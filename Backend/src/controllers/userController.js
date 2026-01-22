import pool from '../../db.js';

export const registerUser = async (req, res) => {
  const { firstName, otherName, lastName, email, plateNumber } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, other_name, last_name, email, plate_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, otherName, lastName, email, plateNumber]
    );
    res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
