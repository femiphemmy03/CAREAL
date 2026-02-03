// index.js  (or server.js – main entry point)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import verifyRoutes from './routes/verify.js';
import paymentsRoutes from './routes/payments.js';  
import { protect } from './src/middleware/auth.js'; // we'll create this next
import vehiclesRouter from './routes/vehicles.js';

dotenv.config();

// rest of your code...
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/vehicles', vehiclesRouter);

// Health / root route
app.get('/', (req, res) => {
  res.send('🚗 CAREAL Backend Running Successfully!');
});

// 404 handler (optional but good practice)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.get('/api/profile', protect, async (req, res) => {
  const user = req.user;

  res.json({
    message: 'Profile fetched successfully',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.user_metadata?.first_name || null,
      lastName: user.user_metadata?.last_name || null,
      plateNumber: user.user_metadata?.plate_number || null,
      createdAt: user.created_at,
      // Add more metadata if needed
    },
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});