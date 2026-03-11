import { ArrowRight, Shield, Eye, Clock, Wifi, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const Home = ({ setCurrentPage, isDemoMode = false }) => {
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: 'Professional Security',
      description: 'Enterprise-grade CCTV solutions for complete peace of mind'
    },
    {
    icon: <Eye className="w-8 h-8 text-accent" />,
      title: '4K Ultra HD',
      description: 'Crystal clear video quality with advanced night vision'
    },  
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock surveillance with cloud recording'
    },
    {
      icon: <Wifi className="w-8 h-8 text-accent" />,
      title: 'Smart Connectivity',
      description: 'Remote viewing via mobile app anywhere, anytime'
    }
  ];

  const handleViewDetails = (product) => {
    setCurrentPage('shop');
  };

  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-accent font-inter text-sm">Professional Security Solutions</span>
            </div>
            
            <h1 className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Secure What <br />
              <span className="gradient-text">Matters Most</span>
            </h1>
            
            <p className="font-inter text-lg text-text-secondary mb-8 max-w-xl">
              Advanced CCTV surveillance systems for homes and businesses. 
              Premium quality cameras with AI-powered detection, cloud storage, and 24/7 monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow"
              >
                Browse Cameras
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentPage('demo')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-text-primary font-inter font-semibold rounded-xl hover:border-accent hover:text-accent transition-all"
              >
                Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
              <div className="cursor-pointer group" onClick={() => setCurrentPage('testimonials')}>
                <h3 className="font-orbitron text-3xl font-bold text-accent group-hover:text-amber-400 transition-colors">10K+</h3>
                <p className="text-text-secondary font-inter text-sm group-hover:text-accent transition-colors">Happy Customers</p>
              </div>
              <div className="cursor-pointer group" onClick={() => setCurrentPage('business-clients')}>
                <h3 className="font-orbitron text-3xl font-bold text-accent group-hover:text-amber-400 transition-colors">500+</h3>
                <p className="text-text-secondary font-inter text-sm group-hover:text-accent transition-colors">Business Clients</p>
              </div>
              <div className="cursor-pointer group" onClick={() => setCurrentPage('uptime')}>
                <h3 className="font-orbitron text-3xl font-bold text-accent group-hover:text-amber-400 transition-colors">99.9%</h3>
                <p className="text-text-secondary font-inter text-sm group-hover:text-accent transition-colors">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose <span className="text-accent">SecureView</span>
            </h2>
            <p className="text-text-secondary font-inter max-w-2xl mx-auto">
              Cutting-edge technology meets unmatched reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-xl p-6 card-hover cursor-pointer"
                onClick={index === 0 ? () => setCurrentPage('professional-security') : index === 1 ? () => setCurrentPage('ultrahd') : index === 2 ? () => setCurrentPage('monitoring') : () => setCurrentPage('smart-connectivity')}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-orbitron text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary font-inter text-sm">
                  {feature.description}
                </p>
                {index === 0 && (
                  <button className="mt-4 text-accent text-sm font-inter font-medium hover:text-amber-400 transition-colors flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {index === 1 && (
                  <button className="mt-4 text-accent text-sm font-inter font-medium hover:text-amber-400 transition-colors flex items-center gap-1">
                    Watch Demo <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {index === 2 && (
                  <button className="mt-4 text-accent text-sm font-inter font-medium hover:text-amber-400 transition-colors flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {index === 3 && (
                  <button className="mt-4 text-accent text-sm font-inter font-medium hover:text-amber-400 transition-colors flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4K Video Demo Section */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Experience 4K Ultra <span className="text-accent">HD Quality</span>
            </h2>
            <p className="text-text-secondary font-inter max-w-2xl mx-auto">
              See the difference with crystal clear video quality and advanced night vision
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-black">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%231a1a2e' width='1920' height='1080'/%3E%3Ctext fill='%23f59e0b' font-family='sans-serif' font-size='48' x='50%25' y='50%25' text-anchor='middle'%3ESecureView 4K Camera Demo%3C/text%3E%3C/svg%3E"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-surveillance-camera-in-a-city-at-night-4555-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
                <span className="text-accent font-inter text-sm font-medium">4K Ultra HD</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg">
                <p className="text-white font-inter text-sm">
                  <span className="text-accent font-semibold">Resolution:</span> 3840×2160 | 
                  <span className="text-accent font-semibold ml-2">Night Vision:</span> 100ft
                </p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="font-orbitron text-2xl font-bold text-accent">4K</h3>
                  <p className="text-text-secondary font-inter text-sm">Ultra HD Resolution</p>
                </div>
                <div className="text-center">
                  <h3 className="font-orbitron text-2xl font-bold text-accent">130°</h3>
                  <p className="text-text-secondary font-inter text-sm">Wide Angle Lens</p>
                </div>
                <div className="text-center">
                  <h3 className="font-orbitron text-2xl font-bold text-accent">100ft</h3>
                  <p className="text-text-secondary font-inter text-sm">Night Vision Range</p>
                </div>
                <div className="text-center">
                  <h3 className="font-orbitron text-2xl font-bold text-accent">IP67</h3>
                  <p className="text-text-secondary font-inter text-sm">Weatherproof</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setCurrentPage('shop')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow"
                >
                  View All Cameras
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-text-primary mb-2">
                Featured Cameras
              </h2>
              <p className="text-text-secondary font-inter">
                Our most popular security solutions
              </p>
            </div>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-inter font-medium rounded-lg hover:bg-accent hover:text-background transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-inter font-medium rounded-lg hover:bg-accent hover:text-background transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Ready to Secure Your Property?
            </h2>
            <p className="text-text-secondary font-inter max-w-2xl mx-auto mb-8">
              Get a free consultation with our security experts. We'll help you find the perfect solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('login')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentPage('login')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-text-primary font-inter font-semibold rounded-xl hover:border-accent hover:text-accent transition-all"
              >
              Live View 
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

