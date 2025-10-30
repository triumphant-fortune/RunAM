import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/logo_1761761867719.png';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A2332]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between text-[#73685D]">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-white">
            Run<span className="text-[#FFD700]">AM</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button className="text-white hover:text-[#FFD700] font-medium transition-colors text-sm xl:text-base" data-testid="link-how-it-works">
              How it works
            </button>
            <button className="text-white hover:text-[#FFD700] font-medium transition-colors text-sm xl:text-base" data-testid="link-features">
              Features
            </button>
            <button className="text-white hover:text-[#FFD700] font-medium transition-colors text-sm xl:text-base" data-testid="link-benefits">
              Benefits
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <button className="text-white hover:text-[#FFD700] font-medium transition-colors text-sm xl:text-base" data-testid="button-sign-in">
              Sign in
            </button>
            <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-full font-semibold transition-all text-sm xl:text-base hover:shadow-lg" data-testid="button-get-started">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A2332]/98 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col gap-3">
              <button className="text-left text-white hover:text-[#FFD700] font-medium py-2 px-3 hover:bg-white/5 rounded-lg transition-colors" data-testid="link-mobile-how-it-works">
                How it works
              </button>
              <button className="text-left text-white hover:text-[#FFD700] font-medium py-2 px-3 hover:bg-white/5 rounded-lg transition-colors" data-testid="link-mobile-features">
                Features
              </button>
              <button className="text-left text-white hover:text-[#FFD700] font-medium py-2 px-3 hover:bg-white/5 rounded-lg transition-colors" data-testid="link-mobile-benefits">
                Benefits
              </button>
              <div className="border-t border-white/10 my-2"></div>
              <button className="text-left text-white hover:text-[#FFD700] font-medium py-2 px-3 hover:bg-white/5 rounded-lg transition-colors" data-testid="button-mobile-sign-in">
                Sign in
              </button>
              <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-6 py-3 rounded-full font-semibold text-center transition-all hover:shadow-lg" data-testid="button-mobile-get-started">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}