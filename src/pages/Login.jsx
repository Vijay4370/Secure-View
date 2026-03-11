import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = ({ onLogin, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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

    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem('cctv-users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('cctv-current-user', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative w-full max-w-md">
        {/* Lamp with Rope */}
        <div className="flex justify-center mb-8">
          <div 
            className="cursor-pointer group"
            onClick={() => setShowForm(!showForm)}
            title="Click to login"
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
        <p className="text-text-secondary font-inter text-center mb-8">Login First</p>

        {/* Login Form - Slide Down */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${showForm ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-inter mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Gmail"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

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

            <div className="mt-6 text-center">
              <p className="text-text-secondary font-inter">
                Don't have an account?{' '}
                <button
                  onClick={switchToSignup}
                  className="text-accent hover:text-amber-400 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

