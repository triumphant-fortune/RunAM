import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/logo_1761761867719.png';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-[80px] bg-[#73685D] z-50">
      <div className="absolute top-[14px] left-[20px] right-[20px] h-[52px] bg-white/10 backdrop-blur-sm border border-white/30 rounded-[10px]">
        <div className="flex items-center justify-between h-full px-5 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img src={logoImage} alt="RunAm" className="h-7 sm:h-8" data-testid="link-logo" />
          </div>
          
          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            <button className="text-white hover:text-[#FFD700] transition-colors font-medium text-base lg:text-base" data-testid="link-how-it-works">
              How It Works
            </button>
            <button className="text-white hover:text-[#FFD700] transition-colors font-medium text-base lg:text-base" data-testid="link-features">
              Features
            </button>
            <button className="text-white hover:text-[#FFD700] transition-colors font-medium text-base lg:text-base" data-testid="link-benefits">
              Benefits
            </button>
          </div>

          {/* Right: Sign in + Get Started (Desktop) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <button className="text-white hover:text-[#FFD700] transition-colors font-medium text-base lg:text-base" data-testid="button-sign-in">
              Sign In
            </button>
            <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-6 lg:px-6 py-2.5 lg:py-2.5 rounded-lg font-semibold transition-colors text-base lg:text-base min-h-[44px]" data-testid="button-get-started">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white" data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 right-0 bg-[#73685D] border-t border-white/20">
          <div className="px-6 py-5 space-y-4">
            <button className="block w-full text-left text-white hover:text-[#FFD700] py-3 font-medium text-lg" data-testid="link-mobile-how-it-works">
              How It Works
            </button>
            <button className="block w-full text-left text-white hover:text-[#FFD700] py-3 font-medium text-lg" data-testid="link-mobile-features">
              Features
            </button>
            <button className="block w-full text-left text-white hover:text-[#FFD700] py-3 font-medium text-lg" data-testid="link-mobile-benefits">
              Benefits
            </button>
            <div className="border-t border-white/20 my-3"></div>
            <button className="block w-full text-left text-white hover:text-[#FFD700] py-3 font-medium text-lg" data-testid="button-mobile-sign-in">
              Sign In
            </button>
            <button className="w-full bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-6 py-3.5 rounded-lg font-semibold transition-colors text-lg min-h-[52px]" data-testid="button-mobile-get-started">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
