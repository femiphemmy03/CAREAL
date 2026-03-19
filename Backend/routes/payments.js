// routes/payments.js
import express from 'express';
import pool from '../db.js';
import { protect } from '../src/middleware/auth.js';

const router = express.Router();

// POST – save a new payment
// Expected body:
// {
//   plate_number: "ABC123XYZ",        (required)
//   license: true/false,              (required)
//   roadworthiness: true/false,       (required)
//   insurance: true/false,            (required)
//   license_amount: 15000,            (required if license is true, else 0)
//   roadworthiness_amount: 8000,      (required if roadworthiness is true, else 0)
//   insurance_amount: 5000,           (required if insurance is true, else 0)
//   payment_ref: "PAY-XXXX"          (optional – from payment gateway)
// }
router.post('/', protect, async (req, res) => {
  const {
    plate_number,
    license = false,
    roadworthiness = false,
    insurance = false,
    license_amount = 0,
    roadworthiness_amount = 0,
    insurance_amount = 0,
    payment_ref = null,
  } = req.body;

  // Validate – at least one service must be selected
  if (!plate_number) {
    return res.status(400).json({ message: 'plate_number is required' });
  }
  if (!license && !roadworthiness && !insurance) {
    return res.status(400).json({ message: 'At least one service must be selected' });
  }

  // Total is the sum of whichever services were selected
  const amount =
    (license ? Number(license_amount) : 0) +
    (roadworthiness ? Number(roadworthiness_amount) : 0) +
    (insurance ? Number(insurance_amount) : 0);

  try {
    const result = await pool.query(
      `INSERT INTO vehicle_payments (
        user_id,
        plate_number,
        license,
        roadworthiness,
        insurance,
        license_amount,
        roadworthiness_amount,
        insurance_amount,
        amount,
        payment_ref,
        license_status,
        roadworthiness_status,
        insurance_status,
        status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        'Pending', 'Pending', 'Pending', 'pending'
      )
      RETURNING *`,
      [
        req.user.id,
        plate_number.toUpperCase(),
        license,
        roadworthiness,
        insurance,
        license ? Number(license_amount) : 0,
        roadworthiness ? Number(roadworthiness_amount) : 0,
        insurance ? Number(insurance_amount) : 0,
        amount,
        payment_ref,
      ]
    );

    res.status(201).json({
      message: 'Payment recorded successfully',
      payment: result.rows[0],
    });

  } catch (err) {
    console.error('Payment save error:', err);
    res.status(500).json({ message: 'Failed to record payment', error: err.message });
  }
});

// GET – fetch all payments for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM vehicle_payments WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch payments error:', err);
    res.status(500).json({ message: 'Failed to fetch payments', error: err.message });
  }
});

export default router;
