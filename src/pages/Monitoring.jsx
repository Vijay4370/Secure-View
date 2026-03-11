import { ArrowLeft, Clock, CheckCircle, Cloud, Bell, Calendar } from 'lucide-react';

const Monitoring = ({ onBack }) => {
  const features = [
    '24/7 continuous recording without interruption',
    'Cloud storage with 30-day retention',
    'Real-time motion detection alerts',
    'Smart AI human and vehicle detection',
    'Customizable recording schedules',
    'Instant push notifications to your phone',
    'Remote access from anywhere',
    'Multiple camera support',
    'Automatic overwrite when storage full',
    'Email and SMS alerts',
    'Professional monitoring options available',
    'Secure encrypted video transmission'
  ];

  const specifications = [
    { label: 'Recording', value: '24/7 Continuous' },
    { label: 'Cloud Storage', value: '30 Days' },
    { label: 'Local Storage', value: 'Up to 2TB' },
    { label: 'Motion Alerts', value: 'Instant' },
    { label: 'AI Detection', value: 'Human & Vehicle' },
    { label: 'Channels', value: 'Up to 16' },
    { label: 'Encryption', value: '256-bit AES' },
    { label: 'Uptime', value: '99.9%' }
  ];

  const benefits = [
    {
      icon: <Cloud className="w-8 h-8 text-accent" />,
      title: 'Cloud Recording',
      description: 'Secure cloud storage with easy access from any device'
    },
    {
      icon: <Bell className="w-8 h-8 text-accent" />,
      title: 'Instant Alerts',
      description: 'Real-time notifications for motion, person, and vehicle detection'
    },
    {
      icon: <Calendar className="w-8 h-8 text-accent" />,
      title: 'Scheduled Recording',
      description: 'Set custom recording schedules for different times and days'
    }
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
              <Clock className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
              24/7 <span className="text-accent">Monitoring</span>
            </h1>
            <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto">
              Round-the-clock surveillance with cloud recording and instant alerts
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary text-center mb-8">
              Technical <span className="text-accent">Specifications</span>
            </h2>
            
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
              Key <span className="text-accent">Features</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text-secondary font-inter">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Monitoring;

