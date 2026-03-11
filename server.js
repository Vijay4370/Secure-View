import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vrajput7980_db_user:Vaibhav4370@cluster0.yvgyci5.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vrajput4370@gmail.com',
      pass: 'jxvpzgncykilblod'
    }
  });
};

// Send verification email endpoint
app.post('/api/send-verification', async (req, res) => {
  const { email, name, code } = req.body;

  if (!email || !name || !code) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: '"SecureView CCTV Shop" <vrajput4370@gmail.com>',
      to: email,
      subject: 'Email Verification - SecureView CCTV Shop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">SecureView</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Verify Your Email</h2>
            <p style="color: #4b5563;">Hello ${name},</p>
            <p style="color: #4b5563;">Thank you for signing up with SecureView CCTV Shop!</p>
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
              <p style="color: #4b5563; margin-bottom: 10px;">Your verification code is:</p>
              <span style="font-size: 32px; font-weight: bold; color: #f59e0b; letter-spacing: 8px;">${code}</span>
            </div>
            <p style="color: #6b7280; font-size: 14px;">This code will expire in 10 minutes.</p>
            <p style="color: #6b7280; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
          </div>
          <div style="background: #f3f4f6; padding: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">Don't Reply to this email. This is a system generated email, please don't reply to this message.</p>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">© 2024 SecureView CCTV Shop. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Register new user to MongoDB
app.post('/api/register-user', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phone
    });

    await newUser.save();
    
    console.log('New user registered:', { name, email, createdAt: new Date() });
    
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
});

// Check if user exists
app.post('/api/check-user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ exists: false, message: 'Email is required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error('Check user error:', error);
    res.json({ exists: false });
  }
});

// Admin endpoint to get all users (protected)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

