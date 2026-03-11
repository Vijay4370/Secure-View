import { useState, useRef } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, Send, User } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Signup = ({ onSignup, switchToLogin }) => {
  const [step, setStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const [generatedCode, setGeneratedCode] = useState('');
  const formRef = useRef();

  // Use different API URL based on environment
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api' 
    : '/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

const sendVerificationEmail = async (email, code, name) => {
    try {
      // Call our own backend server
      const response = await fetch(`${API_URL}/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code, name }),
      });

      const data = await response.json();
      
      if (data.success) {
        return true;
      }
      return false;
    } catch (emailError) {
      console.error('Email Error:', emailError);
      // Fallback: show code in console for demo
      console.log('Verification code:', code);
      return false;
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please use a valid Gmail address (@gmail.com)');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

// Check MongoDB for existing user
    try {
      const checkResponse = await fetch(`${API_URL}/check-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const checkData = await checkResponse.json();
      if (checkData.exists) {
        setError('An account with this email already exists');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log('Could not check MongoDB, continuing...');
    }

    const code = generateCode();
    setGeneratedCode(code);

    // Try to send email to user's email
    const emailSent = await sendVerificationEmail(formData.email, code, formData.name);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (emailSent) {
      setSuccess(`Verification code sent to ${formData.email}!`);
    } else {
      // Fallback: show code in success message
      setSuccess(`Code: ${code} (Check your email or use this code)`);
    }

    setStep(2);
    setShowForm(false);
    setIsLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get current date and time in India timezone (IST)
    const now = new Date();
    // Convert to India timezone (Asia/Kolkata = UTC+5:30)
    const indiaTimeOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const indiaTime = new Date(now.getTime() + indiaTimeOffset);
    const dateTime = indiaTime.toISOString();

    if (verificationCode === generatedCode) {
      // Save to MongoDB only
      try {
const response = await fetch(`${API_URL}/register-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          }),
        });
        
        const data = await response.json();
        if (!data.success) {
          console.log('MongoDB registration note:', data.message);
        }
      } catch (mongoError) {
        console.log('MongoDB connection note:', mongoError.message);
      }

      // Create user for session (only in memory, not saved to localStorage)
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        createdAt: dateTime
      };

      setSuccess('Account created successfully!');
      setTimeout(() => {
        onSignup(newUser);
      }, 1500);
    } else {
      setError('Invalid verification code. Please try again.');
    }

    setIsLoading(false);
  };

  const resendCode = async () => {
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCode = generateCode();
    setGeneratedCode(newCode);

    const emailSent = await sendVerificationEmail(formData.email, newCode, formData.name);

    if (emailSent) {
      setSuccess(`New verification code sent to ${formData.email}!`);
    } else {
      setSuccess(`New code (demo): ${newCode}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative w-full max-w-md">
        {/* Lamp with Rope */}
        <div className="flex justify-center mb-8">
          <div
            className="cursor-pointer group"
            onClick={() => setShowForm(!showForm)}
            title="Click rope!"
          >
            <div className="w-0.5 h-12 bg-gradient-to-b from-slate-600 to-slate-800 mx-auto"></div>
            <div className="w-6 h-3 bg-gradient-to-b from-slate-700 to-slate-900 mx-auto rounded-b-md"></div>
            <div className="relative">
              <svg
                className="w-16 h-20 text-amber-400 lamp-glow animate-lamp"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C9.24 2 7 4.24 7 7v3H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V7c0-2.76-2.24-5-5-5z"/>
                <ellipse cx="12" cy="17" rx="6" ry="3" fill="rgba(245, 158, 11, 0.3)"/>
              </svg>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-amber-400 whitespace-nowrap">
                {showForm ? 'Hide' : 'Click rope!'}
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-orbitron text-3xl font-bold gradient-text text-center mb-2">SecureView</h1>
        <p className="text-text-secondary font-inter text-center mb-8">Create your account</p>

        {/* Signup Form - Slide Down */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${showForm && step === 1 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSendCode} ref={formRef}>
              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-inter mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-inter mb-2">Gmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-12 pr-4 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-inter mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full pl-12 pr-12 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-inter mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-4 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-success/10 border border-success/30 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <p className="text-success text-sm">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-inter font-semibold transition-all flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-accent/50 text-background cursor-not-allowed'
                    : 'bg-accent text-background hover:bg-amber-400 btn-glow'
                }`}
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Verification Code
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary font-inter">
                Already have an account?{' '}
                <button
                  onClick={switchToLogin}
                  className="text-accent hover:text-amber-400 font-semibold"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Verification Step - Step 2 */}
        {step === 2 && (
          <div className="glass rounded-2xl p-8">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-orbitron text-xl font-bold text-text-primary">Verify Your Email</h2>
              <p className="text-text-secondary text-sm mt-2">
                We've sent a 6-digit verification code to<br />
                <span className="text-accent">{formData.email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-inter mb-2">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-success/10 border border-success/30 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <p className="text-success text-sm">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className={`w-full py-3 rounded-xl font-inter font-semibold transition-all ${
                  isLoading || verificationCode.length !== 6
                    ? 'bg-accent/50 text-background cursor-not-allowed'
                    : 'bg-accent text-background hover:bg-amber-400 btn-glow'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary text-sm">
                Didn't receive the code?{' '}
                <button
                  onClick={resendCode}
                  disabled={isLoading}
                  className="text-accent hover:text-amber-400 font-semibold"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;

