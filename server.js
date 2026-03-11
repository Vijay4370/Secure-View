import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration - Configure your email here
// You can use Gmail, Outlook, or any SMTP server
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo'
    auth: {
      user: 'vrajput4370@gmail.com', // Replace with your email
      pass: 'jxvpzgncykilblod' // Replace with your app password (no spaces)
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

