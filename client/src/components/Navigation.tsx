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
    <nav 
      className="fixed z-50" 
      style={{ 
        backgroundColor: '#73685D',
        width: '1920px',
        height: '129px',
        top: '0.08px',
        left: '-0.17px'
      }}
    >
      <div 
        className="bg-white/10 backdrop-blur-sm border border-white/30" 
        style={{ 
          width: '1860px',
          height: '64px',
          top: '32px',
          left: '25px',
          position: 'absolute',
          borderRadius: '10px',
          borderWidth: '1px'
        }}
      >
        <div className="flex items-center justify-between h-full w-full px-6 lg:px-8">
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden py-4 bg-white/10 backdrop-blur-sm border border-white/30 px-4"
          style={{
            position: 'absolute',
            top: '100px',
            left: '25px',
            width: '1860px',
            borderRadius: '10px',
            borderWidth: '1px'
          }}
        >
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
    </nav>
  );
}
