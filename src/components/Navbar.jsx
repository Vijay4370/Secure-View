import { useState } from 'react';
import { ShoppingCart, Menu, X, Camera, User, Bell, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ currentPage, setCurrentPage, currentUser, onLogout, onLoginClick, isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount, toggleCart } = useCart();

  // Show Live View only when authenticated, otherwise show Dashboard for demo
  const navItems = isAuthenticated 
    ? [
        { id: 'loginhome', label: 'Home' },
        { id: 'shop', label: 'Shop' },
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'liveview', label: 'Live View' },
      ]
    : [
        { id: 'home', label: 'Home' },
        { id: 'shop', label: 'Shop' },
        { id: 'demo', label: 'Demo' },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage(isAuthenticated ? 'loginhome' : 'home')}
          >
            <div className="relative">
              <Camera className="w-8 h-8 text-accent" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="font-orbitron text-xl font-bold text-text-primary">
              Secure<span className="text-accent">View</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-inter text-sm font-medium transition-colors duration-300 ${
                  currentPage === item.id
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>

            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-background text-xs font-bold rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* User Profile / Login / Signup */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-inter text-text-primary">{currentUser.name}</span>
                  <span className="text-xs text-text-secondary">{currentUser.email}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-text-secondary hover:text-danger transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg font-inter text-sm font-semibold hover:bg-amber-400 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Login
                </button>
                <button 
                  onClick={() => setCurrentPage('signup')}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg font-inter text-sm font-semibold hover:bg-amber-400 transition-colors"
                >
                  Signup
                </button>
              </div>
            )}
            
            

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 font-inter text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
            {!currentUser && (
              <button
                onClick={() => {
                  setCurrentPage('login');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 font-inter text-sm font-medium text-accent"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
