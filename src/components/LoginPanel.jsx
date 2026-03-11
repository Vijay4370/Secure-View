import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, X } from 'lucide-react';

const LoginPanel = ({ isOpen, onClose, onLogin, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when panel closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@gmail.com')) {
      setError('Please use a valid Gmail address');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('cctv-users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('cctv-current-user', JSON.stringify(user));
      onLogin(user);
      onClose();
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Slide-down Login Panel */}
      <div className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
        <div className="min-h-screen flex items-start justify-center pt-20 px-4">
          <div className="relative w-full max-w-md glass rounded-2xl p-8 border border-border shadow-2xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-full mb-3">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-orbitron text-2xl font-bold gradient-text">SecureView</h2>
              <p className="text-text-secondary font-inter text-sm mt-1">Welcome back! Please login</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-text-secondary text-sm font-inter mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Gmail"
                    className="w-full pl-11 pr-4 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-text-secondary text-sm font-inter mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-inter font-semibold transition-all ${
                  isLoading
                    ? 'bg-accent/50 text-background cursor-not-allowed'
                    : 'bg-accent text-background hover:bg-amber-400 btn-glow'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Switch to Signup */}
            <div className="mt-5 text-center">
              <p className="text-text-secondary font-inter text-sm">
                Don't have an account?{' '}
                <button
                  onClick={switchToSignup}
                  className="text-accent hover:text-amber-400 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Demo hint */}
            <div className="mt-4 text-center">
              <p className="text-text-secondary text-xs">
                Demo: Sign up first, then login
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPanel;

