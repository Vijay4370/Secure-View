import { ArrowLeft, Shield, CheckCircle, Camera, Cloud, Smartphone, Bell, Lock, Eye, Users, Clock, Wifi } from 'lucide-react';

const ProfessionalSecurity = ({ onBack }) => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: 'Enterprise-Grade Protection',
      description: 'Military-grade encryption and advanced security protocols to protect your property'
    },
    {
      icon: <Camera className="w-8 h-8 text-accent" />,
      title: 'High-Definition Surveillance',
      description: 'Crystal clear 4K video quality with advanced night vision up to 100ft'
    },
    {
      icon: <Cloud className="w-8 h-8 text-accent" />,
      title: 'Cloud Storage',
      description: 'Secure cloud recording with 30-day storage and easy playback'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-accent" />,
      title: 'Remote Access',
      description: 'View live footage from anywhere using our mobile app'
    },
    {
      icon: <Bell className="w-8 h-8 text-accent" />,
      title: 'Instant Alerts',
      description: 'Real-time notifications for motion detection and suspicious activity'
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: 'Multi-User Access',
      description: 'Grant access to family members or employees with customizable permissions'
    }
  ];

  const features = [
    '4K Ultra HD resolution with 130° wide-angle lens',
    'AI-powered human and vehicle detection',
    'Two-way audio communication',
    'Smart IR night vision up to 100 feet',
    'IP67 weatherproof rating for outdoor use',
    'H.265+ video compression for efficient storage',
    '256-bit AES encryption for secure transmission',
    'Integration with smart home devices',
    'Customizable motion detection zones',
    'Scheduled recording options',
    'Multiple camera support (up to 16 channels)',
    'Professional installation available'
  ];

  const specifications = [
    { label: 'Resolution', value: '4K (3840 × 2160)' },
    { label: 'Night Vision', value: 'Up to 100ft / 30m' },
    { label: 'Field of View', value: '130° Wide Angle' },
    { label: 'Weather Rating', value: 'IP67 Indoor/Outdoor' },
    { label: 'Connectivity', value: 'WiFi & Ethernet' },
    { label: 'Storage', value: 'Cloud + Local SD Card' },
    { label: 'Audio', value: 'Two-Way Audio' },
    { label: 'Power', value: 'PoE or DC Power' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-inter">Back to Home</span>
          </button>
        </div>
      </div>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-6">
              <Shield className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Professional <span className="text-accent">Security</span>
            </h1>
            <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto">
              Enterprise-grade CCTV solutions for complete peace of mind. 
              Advanced technology meets unmatched reliability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
            Comprehensive <span className="text-accent">Security Features</span>
          </h2>
          <p className="text-text-secondary font-inter text-center max-w-2xl mx-auto mb-12">
            Our professional security solutions provide complete protection for your home or business
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-orbitron text-lg font-semibold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary font-inter text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
              Technical <span className="text-accent">Specifications</span>
            </h2>
            <p className="text-text-secondary font-inter text-center max-w-2xl mx-auto mb-8">
              Industry-leading hardware for maximum reliability
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-primary rounded-xl p-4 text-center">
                  <p className="text-accent font-orbitron text-sm font-semibold mb-1">{spec.label}</p>
                  <p className="text-text-secondary font-inter text-xs">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary text-center mb-8">
              What's <span className="text-accent">Included</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text-secondary font-inter">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold text-text-primary mb-2">24/7 Monitoring</h3>
              <p className="text-text-secondary font-inter text-sm">Round-the-clock surveillance with cloud recording</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold text-text-primary mb-2">Smart Connectivity</h3>
              <p className="text-text-secondary font-inter text-sm">Remote viewing via mobile app anywhere, anytime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold text-text-primary mb-2">Secure Encryption</h3>
              <p className="text-text-secondary font-inter text-sm">Bank-level encryption for your privacy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalSecurity;

