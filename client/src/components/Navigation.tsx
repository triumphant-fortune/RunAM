import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/logo_1761761867719.png';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    console.log(`Scrolling to ${sectionId}`);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <div className="max-w-7xl mx-auto backdrop-blur-lg rounded-full px-6 lg:px-8 border border-white/10" style={{ backgroundColor: 'rgba(115, 104, 93, 0.8)' }}>
        <div className="flex items-center justify-between h-14 lg:h-16 w-full">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" data-testid="link-logo">
              <img src={logoImage} alt="RunAm Logo" className="h-8 lg:h-10" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-white hover:text-runam-yellow transition-colors font-medium"
                data-testid="link-how-it-works"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-white hover:text-runam-yellow transition-colors font-medium"
                data-testid="link-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-white hover:text-runam-yellow transition-colors font-medium"
                data-testid="link-benefits"
              >
                Benefits
              </button>
            </div>
          </div>

          {/* Right side: Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => console.log('Sign in clicked')}
              className="text-white hover:text-runam-yellow transition-colors font-medium"
              data-testid="button-sign-in"
            >
              Sign in
            </button>
            <Button
              onClick={() => console.log('Get started clicked')}
              className="bg-runam-green hover:bg-runam-green/90 text-white px-6 rounded-full"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-black/50 backdrop-blur-lg">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-white hover:text-runam-yellow transition-colors font-medium py-2"
                data-testid="link-mobile-how-it-works"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-white hover:text-runam-yellow transition-colors font-medium py-2"
                data-testid="link-mobile-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-left text-white hover:text-runam-yellow transition-colors font-medium py-2"
                data-testid="link-mobile-benefits"
              >
                Benefits
              </button>
              <button
                onClick={() => console.log('Sign in clicked')}
                className="text-left text-white hover:text-runam-yellow transition-colors font-medium py-2"
                data-testid="button-mobile-sign-in"
              >
                Sign in
              </button>
              <Button
                onClick={() => console.log('Get started clicked')}
                className="bg-runam-green hover:bg-runam-green/90 text-white rounded-full"
                data-testid="button-mobile-get-started"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
