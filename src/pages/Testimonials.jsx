import { useState } from 'react';
import { Star, Quote, User, ArrowLeft } from 'lucide-react';

const Testimonials = ({ onBack }) => {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      location: 'New York, USA',
      rating: 5,
      comment: 'SecureView provided exceptional security for my retail store. The 4K cameras have crystal clear quality and the installation was seamless. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'Los Angeles, USA',
      rating: 5,
      comment: 'The AI-powered motion detection is incredible! I receive instant alerts on my phone whenever there is any movement around my property. Best investment for home security.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Michael Chen',
      location: 'San Francisco, USA',
      rating: 5,
      comment: 'We installed SecureView cameras across our warehouse facility. The night vision is outstanding and the cloud storage gives us peace of mind 24/7.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Emily Davis',
      location: 'Miami, USA',
      rating: 5,
      comment: 'As a business owner, security is my top priority. SecureView delivered beyond my expectations. The PTZ cameras cover every angle perfectly.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      location: 'Chicago, USA',
      rating: 5,
      comment: 'The professional consultation helped me choose the perfect system for my office. The remote viewing feature is a game-changer for monitoring when away.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      location: 'Seattle, USA',
      rating: 5,
      comment: 'I was impressed by the quality of customer service. They guided me through every step and the system works flawlessly. Worth every penny!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'David Martinez',
      location: 'Houston, USA',
      rating: 5,
      comment: 'Installed cameras at my restaurant and the difference is amazing. The footage quality is superb and the motion alerts help prevent theft.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Amanda Thompson',
      location: 'Boston, USA',
      rating: 5,
      comment: 'The mobile app is so easy to use! I can check on my home from anywhere in the world. SecureView made home security simple and affordable.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '500+', label: 'Business Clients' },
    { value: '50K+', label: 'Cameras Installed' },
    { value: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
            What Our <span className="text-accent">Customers Say</span>
          </h1>
          <p className="text-text-secondary font-inter max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SecureView for their security needs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center">
              <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </h3>
              <p className="text-text-secondary font-inter text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass rounded-xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-orbitron font-semibold text-text-primary">
                        {testimonial.name}
                      </h4>
                      <p className="text-text-secondary text-sm">{testimonial.location}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-1 -left-1 w-6 h-6 text-accent/30" />
                    <p className="text-text-secondary font-inter text-sm pl-6">
                      {testimonial.comment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Ready to Join Our Happy Customers?
            </h2>
            <p className="text-text-secondary font-inter mb-6 max-w-xl mx-auto">
              Get a free consultation and see why thousands choose SecureView for their security needs
            </p>
            <button
              onClick={() => {
                onBack();
              }}
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

export default Testimonials;

