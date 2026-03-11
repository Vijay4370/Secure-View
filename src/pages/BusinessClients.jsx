import { ArrowLeft, Building2, Shield, Users, Clock, CheckCircle } from 'lucide-react';

const BusinessClients = ({ onBack }) => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: 'Enterprise Security',
      description: 'Advanced CCTV solutions designed for large-scale business operations'
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: 'Multi-user Access',
      description: 'Manage multiple users and access levels across your organization'
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock surveillance with cloud recording and instant alerts'
    }
  ];

  const features = [
    'Advanced AI-powered detection',
    'Multi-location support',
    'Custom integration options',
    'Priority support',
    'Bulk pricing discounts',
    'Professional installation'
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-6">
              <Building2 className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Business <span className="text-accent">Clients</span>
            </h1>
            <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto">
              Enterprise-grade security solutions for businesses of all sizes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            Why Businesses <span className="text-accent">Choose Us</span>
          </h2>
          
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
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessClients;

