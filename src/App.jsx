import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginHome from './pages/LoginHome';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import LiveView from './pages/LiveView';
import Demo from './pages/Demo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginPanel from './components/LoginPanel';
import Testimonials from './pages/Testimonials';
import BusinessClients from './pages/BusinessClients';
import Uptime from './pages/Uptime';
import ProfessionalSecurity from './pages/ProfessionalSecurity';
import UltraHD from './pages/UltraHD';
import Monitoring from './pages/Monitoring';
import SmartConnectivity from './pages/SmartConnectivity';

const AUTH_PAGES = ['login', 'signup'];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showCheckout, setShowCheckout] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('cctv-current-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handlePageChange = (page) => {
    // If navigating to liveview from demo mode, set demo mode
    if (page === 'liveview' && isDemoMode) {
      setCurrentPage(page);
      return;
    }
    // If already authenticated or going to liveview in demo mode, allow access
    if (page === 'liveview' && isDemoMode) {
      setCurrentPage(page);
      setShowCheckout(false);
      return;
    }
    setCurrentPage(page);
    setShowCheckout(false);
  };

  const handleEnterDemo = () => {
    setIsDemoMode(true);
    setCurrentPage('liveview');
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentPage('loginhome');
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentPage('loginhome');
  };

  const handleLogout = () => {
    localStorage.removeItem('cctv-current-user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsDemoMode(false);
    setCurrentPage('home');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCurrentPage('login');
      return;
    }
    setShowCheckout(true);
  };

  const getPageContent = () => {
    if (showCheckout) {
      return <Checkout onBack={() => setShowCheckout(false)} currentUser={currentUser} />;
    }

    if (currentPage === 'login' && !isAuthenticated) {
      return <Login onLogin={handleLogin} switchToSignup={() => setCurrentPage('signup')} />;
    }
    if (currentPage === 'signup' && !isAuthenticated) {
      return <Signup onSignup={handleSignup} switchToLogin={() => setCurrentPage('login')} />;
    }

    if (currentPage === 'dashboard') {
      // Allow dashboard in demo mode (without login) or when authenticated
      if (isAuthenticated) {
        return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
      }
      // For demo purposes without login, show dashboard in demo mode
      setIsDemoMode(true);
      return <Dashboard currentUser={{ name: 'Demo User', email: 'demo@secureview.com' }} onLogout={handleLogout} />;
    }
    if (currentPage === 'liveview') {
      // Allow liveview in demo mode without login
      if (isDemoMode || isAuthenticated) {
        return <LiveView isDemoMode={isDemoMode || !isAuthenticated} />;
      }
      // For demo purposes, allow access without login
      return <LiveView isDemoMode={true} />;
    }

    // Demo page - shows demo videos
    if (currentPage === 'demo') {
      return <Demo />;
    }

    if (currentPage === 'testimonials') {
      return <Testimonials onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'business-clients') {
      return <BusinessClients onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'uptime') {
      return <Uptime onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'professional-security') {
      return <ProfessionalSecurity onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'ultrahd') {
      return <UltraHD onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'monitoring') {
      return <Monitoring onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'smart-connectivity') {
      return <SmartConnectivity onBack={() => setCurrentPage('home')} />;
    }

    if (currentPage === 'loginhome') {
      return <LoginHome setCurrentPage={handlePageChange} currentUser={currentUser} />;
    }
    if (currentPage === 'home') {
      return <Home setCurrentPage={handlePageChange} />;
    }
    if (currentPage === 'shop') {
      return <Shop setCurrentPage={handlePageChange} handleCheckout={handleCheckout} />;
    }

    return <Home setCurrentPage={handlePageChange} />;
  };

  const showLayout = !AUTH_PAGES.includes(currentPage) || isAuthenticated;

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        {showLayout && !showCheckout && (
          <Navbar 
            currentPage={currentPage} 
            setCurrentPage={handlePageChange} 
            currentUser={currentUser}
            onLogout={handleLogout}
            onLoginClick={() => setShowLoginPanel(true)}
            isAuthenticated={isAuthenticated}
          />
        )}
        <main className={showLayout && !showCheckout ? 'pt-16' : ''}>
          {getPageContent()}
        </main>
        {showLayout && !showCheckout && <Footer />}
        {showLayout && !showCheckout && <CartDrawer onCheckout={handleCheckout} />}

        <LoginPanel 
          isOpen={showLoginPanel}
          onClose={() => setShowLoginPanel(false)}
          onLogin={handleLogin}
          switchToSignup={() => {
            setShowLoginPanel(false);
            setCurrentPage('signup');
          }}
        />
      </div>
    </CartProvider>
  );
}

export default App;

