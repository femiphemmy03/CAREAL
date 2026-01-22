// src/controllers/authController.js
import { supabase } from '../lib/supabaseClient.js';  // adjust path

export const signup = async (req, res) => {
  const { firstName, otherName, lastName, email, password, plateNumber } = req.body;

  if (!firstName || !lastName || !email || !password || !plateNumber) {
    return res.status(400).json({
      message: 'firstName, lastName, email, password, plateNumber are required',
    });
  }

  try {
    // 1. Supabase auth signup (creates user in auth.users)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          other_name: otherName || null,
          last_name: lastName,
          plate_number: plateNumber,
        },
      },
    });

    if (authError) {
      if (authError.message.includes('duplicate key')) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      throw authError;
    }

    if (!authData.user) {
      return res.status(500).json({ message: 'Signup failed - no user returned' });
    }

    // 2. Optionally insert into your vehicle_users table if you want to keep it separate
    // (but most people just use auth.users metadata for this in Supabase)
    // If you keep vehicle_users, you can do:
    // await supabase.from('vehicle_users').insert({...})

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        firstName,
        lastName,
        plateNumber,
      },
      // Supabase returns session with access_token
      token: authData.session?.access_token,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get user metadata if stored in auth.users
    const userMetadata = data.user?.user_metadata || {};

    res.json({
      message: 'Login successful',
      token: data.session.access_token,
      user: {
        id: data.user.id,
        firstName: userMetadata.first_name,
        lastName: userMetadata.last_name,
        email: data.user.email,
        plateNumber: userMetadata.plate_number,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};