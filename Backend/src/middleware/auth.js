// src/middleware/auth.js
import { supabase } from '../supabase.js';  // adjust path if needed (../supabase.js since it's in src/)

export const protect = async (req, res, next) => {
  // Expect token as "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided - authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;  // Attach authenticated user to request
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ message: 'Authentication failed' });
  }
};