import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertTriangle, Shield } from 'lucide-react';

const LockScreen = ({ onUnlock, failedAttempts, isLocked }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  // Default PIN: 1234 (in real app, this would be server-side)
  const CORRECT_PIN = '1234';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Too many attempts. Please wait 30 seconds.');
      return;
    }

    // Sanitize input - only allow digits
    const sanitizedPin = pin.replace(/\D/g, '');
    
    if (sanitizedPin === CORRECT_PIN) {
      onUnlock(true);
      setPin('');
      setError('');
    } else {
      setError('Invalid PIN. Try again.');
      setPin('');
      onUnlock(false);
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 4) {
      setPin(value);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* Lock Card */}
      <div className="relative glass rounded-2xl p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-orbitron text-2xl font-bold text-text-primary">
            Secure Access
          </h2>
          <p className="text-text-secondary font-inter text-sm mt-2">
            Enter your 4-digit PIN to access the dashboard
          </p>
        </div>

        {isLocked ? (
          // Locked state
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-danger/20 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
            <h3 className="font-orbitron text-xl font-bold text-danger mb-2">
              Account Locked
            </h3>
            <p className="text-text-secondary font-inter">
              Too many failed attempts. Please wait 30 seconds before trying again.
            </p>
          </div>
        ) : (
          // PIN Input
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-text-secondary text-sm font-inter mb-2">
                PIN Code
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="Enter 4-digit PIN"
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent text-center text-2xl tracking-widest"
                  maxLength={4}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-danger text-sm font-inter mt-2 text-center">{error}</p>
              )}
            </div>

            {/* Failed attempts warning */}
            {failedAttempts > 0 && (
              <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg">
                <p className="text-danger text-sm font-inter text-center">
                  {3 - failedAttempts} attempts remaining before lockout
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={pin.length !== 4}
              className={`w-full py-3 rounded-xl font-inter font-semibold transition-all flex items-center justify-center gap-2 ${
                pin.length === 4
                  ? 'bg-accent text-background hover:bg-amber-400 btn-glow'
                  : 'bg-secondary text-text-secondary cursor-not-allowed'
              }`}
            >
              <Lock className="w-5 h-5" />
              Unlock
            </button>
          </form>
        )}

        {/* Demo PIN hint */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-text-secondary text-xs font-inter text-center">
            Demo PIN: 1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
