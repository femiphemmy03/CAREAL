// src/controllers/authController.js
import { supabase } from '../supabase.js';
import bcrypt from 'bcryptjs';
import { frscVerify } from '../utils/frscCheck.js';

// SIGNUP with plate verification
export const signup = async (req, res) => {
  const { firstName, otherName, lastName, email, password, plateNumber } = req.body;

  try {
    // 1. Verify plate number via FRSC
    const result = await frscVerify(plateNumber.trim().toUpperCase());

    if (result.status !== 'VALID') {
      return res.status(400).json({
        message: 'Plate number verification failed',
        status: result.status,
        details: result.message,
      });
    }

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Insert into vehicle_users (only your table, no Supabase Auth)
    const { data, error } = await supabase
      .from('vehicle_users')
      .insert([
        {
          id: crypto.randomUUID(), // generate UUID yourself
          first_name: firstName,
          other_name: otherName || null,
          last_name: lastName,
          email,
          password_hash: passwordHash,
          plate_number: plateNumber.toUpperCase(),
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(201).json({
      message: 'Account created successfully',
      user: data,
      verifiedVehicle: {
        make: result.make,
        color: result.color,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGIN (manual check against vehicle_users table)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('vehicle_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
