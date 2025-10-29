import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoImage from '@assets/logo_1761761867719.png';

const footerLinks = {
  forSenders: [
    { label: 'How to Send', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Track Package', href: '#' },
    { label: 'Safety Tips', href: '#' },
  ],
  forTravelers: [
    { label: 'Become a Traveler', href: '#' },
    { label: 'Earnings', href: '#' },
    { label: 'Guidelines', href: '#' },
    { label: 'Insurance', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

const socialIcons = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-runam-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img src={logoImage} alt="RunAm Logo" className="h-10" data-testid="img-footer-logo" />
            </div>
            <p className="text-gray-400 text-sm mb-6" data-testid="text-footer-tagline">
              Connecting senders with travelers for faster, cheaper, and safer deliveries worldwide.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`${social.label} clicked`);
                    }}
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-runam-green flex items-center justify-center transition-colors"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* For Senders */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4" data-testid="text-footer-senders-heading">
              For Senders
            </h3>
            <ul className="space-y-3">
              {footerLinks.forSenders.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`${link.label} clicked`);
                    }}
                    className="text-gray-400 hover:text-runam-green transition-colors text-sm"
                    data-testid={`link-footer-sender-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Travelers */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4" data-testid="text-footer-travelers-heading">
              For Travelers
            </h3>
            <ul className="space-y-3">
              {footerLinks.forTravelers.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`${link.label} clicked`);
                    }}
                    className="text-gray-400 hover:text-runam-green transition-colors text-sm"
                    data-testid={`link-footer-traveler-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4" data-testid="text-footer-company-heading">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`${link.label} clicked`);
                    }}
                    className="text-gray-400 hover:text-runam-green transition-colors text-sm"
                    data-testid={`link-footer-company-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm" data-testid="text-footer-copyright">
            © 2025 RunAm. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log('Privacy Policy clicked');
              }}
              className="text-gray-400 hover:text-runam-green transition-colors"
              data-testid="link-footer-privacy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log('Terms of Service clicked');
              }}
              className="text-gray-400 hover:text-runam-green transition-colors"
              data-testid="link-footer-terms"
            >
              Terms of Service
            </a>
            <span className="text-gray-400" data-testid="text-footer-powered">
              Powered by Readsly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
