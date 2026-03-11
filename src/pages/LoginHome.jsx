import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Eye, 
  Clock, 
  Wifi, 
  Camera, 
  Lock, 
  Bell, 
  Activity,
  Users,
  Video,
  Settings,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const LoginHome = ({ setCurrentPage, currentUser }) => {
  const [stats, setStats] = useState({
    cameras: 4,
    online: 4,
    alerts: 2,
    storage: 67
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'motion', message: 'Motion detected at Front Door', time: '2 min ago', icon: <Activity className="w-4 h-4" /> },
    { id: 2, type: 'system', message: 'System health check passed', time: '15 min ago', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    { id: 3, type: 'alert', message: 'Unusual activity detected', time: '1 hour ago', icon: <AlertTriangle className="w-4 h-4 text-yellow-500" /> },
    { id: 4, type: 'system', message: 'Cloud backup completed', time: '3 hours ago', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  ]);

  const quickActions = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" />, description: 'View all camera feeds', color: 'bg-accent/10 border-accent/30' },
    { id: 'liveview', label: 'Live View', icon: <Video className="w-5 h-5" />, description: 'Watch live streams', color: 'bg-blue-500/10 border-blue-500/30' },
    { id: 'shop', label: 'Shop', icon: <Camera className="w-5 h-5" />, description: 'Browse products', color: 'bg-green-500/10 border-green-500/30' },
    { id: 'monitoring', label: 'Monitoring', icon: <Eye className="w-5 h-5" />, description: '24/7 monitoring', color: 'bg-purple-500/10 border-purple-500/30' },
  ];

  const securityFeatures = [
    { icon: <Shield className="w-6 h-6 text-accent" />, title: 'Active Protection', status: 'Enabled', color: 'text-green-500' },
    { icon: <Lock className="w-6 h-6 text-accent" />, title: 'Encryption', status: 'AES-256', color: 'text-green-500' },
    { icon: <Wifi className="w-6 h-6 text-accent" />, title: 'Connection', status: 'Stable', color: 'text-green-500' },
    { icon: <Clock className="w-6 h-6 text-accent" />, title: 'Uptime', status: '99.9%', color: 'text-green-500' },
  ];

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Header */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-text-primary mb-2">
                Welcome back, <span className="text-accent">{currentUser?.name || 'User'}</span>
              </h1>
              <p className="text-text-secondary font-inter">
                Your security system is running smoothly
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage('liveview')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow"
              >
                <Video className="w-5 h-5" />
                View Live
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary font-inter text-sm">Total Cameras</p>
                  <p className="font-orbitron text-2xl font-bold text-text-primary">{stats.cameras}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
            <div className="glass rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary font-inter text-sm">Online</p>
                  <p className="font-orbitron text-2xl font-bold text-green-500">{stats.online}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            <div className="glass rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary font-inter text-sm">Alerts Today</p>
                  <p className="font-orbitron text-2xl font-bold text-yellow-500">{stats.alerts}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="glass rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary font-inter text-sm">Storage Used</p>
                  <p className="font-orbitron text-2xl font-bold text-text-primary">{stats.storage}%</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-orbitron text-xl font-bold text-text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setCurrentPage(action.id)}
                className={`glass rounded-xl p-4 border ${action.color} hover:border-accent transition-all group text-left`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-inter font-semibold text-text-primary">{action.label}</h3>
                <p className="text-text-secondary text-xs mt-1">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Security Status & Recent Activity */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security Status */}
            <div className="glass rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron text-lg font-semibold text-text-primary">Security Status</h3>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-inter font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Protected
                </span>
              </div>
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-primary rounded-lg">
                    <div className="flex items-center gap-3">
                      {feature.icon}
                      <span className="font-inter text-text-primary">{feature.title}</span>
                    </div>
                    <span className={`font-inter text-sm ${feature.color}`}>{feature.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron text-lg font-semibold text-text-primary">Recent Activity</h3>
                <button className="text-accent text-sm font-inter hover:text-amber-400 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-primary rounded-lg">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter text-sm text-text-primary truncate">{activity.message}</p>
                      <p className="text-text-secondary text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-orbitron text-xl font-bold text-text-primary mb-1">
                Recommended Products
              </h2>
              <p className="text-text-secondary font-inter text-sm">
                Enhance your security setup
              </p>
            </div>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent font-inter text-sm font-medium rounded-lg hover:bg-accent hover:text-background transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onViewDetails={() => setCurrentPage('shop')}
              />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-inter font-medium rounded-lg hover:bg-accent hover:text-background transition-all"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 border border-accent/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-orbitron text-2xl font-bold text-text-primary mb-2">
                  Upgrade Your Security Plan
                </h3>
                <p className="text-text-secondary font-inter max-w-xl">
                  Get cloud recording, AI detection, mobile notifications, and 24/7 professional monitoring.
                </p>
              </div>
              <button 
                onClick={() => setCurrentPage('shop')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow whitespace-nowrap"
              >
                View Plans <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginHome;

