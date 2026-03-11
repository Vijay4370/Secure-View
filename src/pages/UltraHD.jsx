import { ArrowLeft, Eye, CheckCircle, Moon, Camera, Smartphone } from 'lucide-react';

const UltraHD = ({ onBack }) => {
  const features = [
    '4K Ultra HD resolution (3840 × 2160)',
    '8MP Sony Starvis sensor for enhanced low-light performance',
    '130° wide-angle lens for maximum coverage',
    'Advanced IR night vision up to 100 feet',
    'H.265+ video compression for efficient storage',
    'Real-time 30fps recording at 4K',
    '3D DNR (Digital Noise Reduction)',
    'WDR (Wide Dynamic Range) 120dB',
    'IP67 weatherproof rating',
    'Built-in microphone for audio recording',
    'Mobile app support (iOS & Android)',
    'Cloud storage compatibility'
  ];

  const specifications = [
    { label: 'Resolution', value: '4K (3840 × 2160)' },
    { label: 'Image Sensor', value: '8MP Sony Starvis' },
    { label: 'Lens', value: '2.8mm Fixed' },
    { label: 'Field of View', value: '130°' },
    { label: 'Night Vision', value: '100ft / 30m' },
    { label: 'Frame Rate', value: '30fps @ 4K' },
    { label: 'Weather Rating', value: 'IP67' },
    { label: 'Operating Temp', value: '-22°F to 140°F' }
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
              <Eye className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-4">
              4K Ultra <span className="text-accent">HD</span>
            </h1>
            <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto">
              Crystal clear video quality with advanced night vision technology
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
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

      <section className="py-16">
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

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold text-text-primary mb-2">Night Vision</h3>
              <p className="text-text-secondary font-inter text-sm">Advanced IR LEDs for clear footage in complete darkness up to 100ft</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold text-text-primary mb-2">4K Resolution</h3>
              <p className="text-text-secondary font-inter text-sm">4x clearer than 1080p, capturing every detail with stunning clarity</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold text-text-primary mb-2">Mobile Access</h3>
              <p className="text-text-secondary font-inter text-sm">View live footage from anywhere using our free mobile app</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UltraHD;

