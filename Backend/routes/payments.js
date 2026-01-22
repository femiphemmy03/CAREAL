// routes/payments.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Save a payment record
router.post('/', async (req, res) => {
  const { title, basePrice, developerFee = 0, paymentCharge = 0 } = req.body;

  if (!title || !basePrice) {
    return res.status(400).json({ message: 'Service title and base price are required' });
  }

  const total = Number(basePrice) + Number(developerFee) + Number(paymentCharge);

  try {
    const result = await pool.query(
      `INSERT INTO payments (service_title, base_price, developer_fee, payment_charge, total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, basePrice, developerFee, paymentCharge, total]
    );

    res.status(201).json({
      message: 'Payment recorded',
      payment: result.rows[0],
    });
  } catch (err) {
    console.error('Payment save error:', err);
    res.status(500).json({ message: 'Failed to record payment' });
  }
});

// Get all payments (admin/debug – consider protecting later)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch payments error:', err);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
});

export default router;