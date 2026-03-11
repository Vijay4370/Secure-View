import { ArrowLeft, Server, Cloud, Shield, Zap, Clock } from 'lucide-react';

const Uptime = ({ onBack }) => {
  const uptimeFeatures = [
    {
      icon: <Server className="w-10 h-10 text-accent" />,
      title: '99.9% Uptime Guarantee',
      description: 'We guarantee 99.9% uptime for all our services, ensuring your security never sleeps.'
    },
    {
      icon: <Cloud className="w-10 h-10 text-accent" />,
      title: 'Cloud Infrastructure',
      description: 'Enterprise-grade cloud servers with redundant backups across multiple data centers.'
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: 'DDoS Protection',
      description: 'Advanced protection against cyber attacks to keep your feeds always accessible.'
    },
    {
      icon: <Zap className="w-10 h-10 text-accent" />,
      title: 'Low Latency Streaming',
      description: 'Real-time video streaming with minimal delay for instant response.'
    },
    {
      icon: <Clock className="w-10 h-10 text-accent" />,
      title: '24/7 Monitoring',
      description: 'Our team monitors systems round the clock to ensure everything runs smoothly.'
    }
  ];

  const uptimeStats = [
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '50+', label: 'Global Servers' },
    { value: '0.1s', label: 'Avg Response Time' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Our <span className="text-accent">Infrastructure</span>
          </h1>
          <p className="text-text-secondary font-inter max-w-2xl mx-auto">
            Enterprise-grade infrastructure ensuring 99.9% uptime for your security
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {uptimeStats.map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center">
              <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </h3>
              <p className="text-text-secondary font-inter text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uptimeFeatures.map((feature, index) => (
            <div key={index} className="glass rounded-xl p-6 card-hover">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-orbitron text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary font-inter text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Ready to Experience Reliability?
            </h2>
            <p className="text-text-secondary font-inter mb-6 max-w-xl mx-auto">
              Get started with SecureView and enjoy peace of mind with our 99.9% uptime guarantee
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-all btn-glow"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uptime;

