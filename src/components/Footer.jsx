import { Camera, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Camera className="w-8 h-8 text-accent" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
              </div>
              <span className="font-orbitron text-xl font-bold text-text-primary">
                Secure<span className="text-accent">View</span>
              </span>
            </div>
            <p className="text-text-secondary font-inter text-sm mb-4 max-w-md">
              Your trusted partner in security solutions. We provide professional CCTV cameras 
              and comprehensive security systems for homes and businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-secondary rounded-full text-text-secondary hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-full text-text-secondary hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-full text-text-secondary hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-full text-text-secondary hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-lg font-semibold text-text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                  Live View
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron text-lg font-semibold text-text-primary mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-inter text-sm">123 Security Street, Tech City</span>
              </li>
              <li className="flex items-center space-x-2 text-text-secondary">
                <Phone className="w-4 h-4 text-accent" />
                <span className="font-inter text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-text-secondary">
                <Mail className="w-4 h-4 text-accent" />
                <span className="font-inter text-sm">support@secureview.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-text-secondary font-inter text-sm">
              © 2024 SecureView. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-text-secondary font-inter text-sm hover:text-accent transition-colors">
                Warranty
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
