import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/logo_1761761867719.png';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-[70px] bg-[#73685D] z-50">
      <div className="absolute top-[12px] left-[25px] right-[25px] h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-[10px]">
        <div className="flex items-center justify-between h-full px-8">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-8">
            <img src={logoImage} alt="RunAm" className="h-10" data-testid="link-logo" />
            
            <div className="hidden md:flex items-center gap-6">
              <button className="text-white hover:text-[#FFD700] transition-colors font-medium" data-testid="link-how-it-works">
                How it works
              </button>
              <button className="text-white hover:text-[#FFD700] transition-colors font-medium" data-testid="link-features">
                Features
              </button>
              <button className="text-white hover:text-[#FFD700] transition-colors font-medium" data-testid="link-benefits">
                Benefits
              </button>
            </div>
          </div>

          {/* Right: Sign in + Get Started */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white hover:text-[#FFD700] transition-colors font-medium" data-testid="button-sign-in">
              Sign in
            </button>
            <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-6 py-2.5 rounded-full font-semibold transition-colors" data-testid="button-get-started">
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
        <div className="absolute top-16 left-6 right-6 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <button className="text-left text-white hover:text-[#FFD700] font-medium" data-testid="link-mobile-how-it-works">
              How it works
            </button>
            <button className="text-left text-white hover:text-[#FFD700] font-medium" data-testid="link-mobile-features">
              Features
            </button>
            <button className="text-left text-white hover:text-[#FFD700] font-medium" data-testid="link-mobile-benefits">
              Benefits
            </button>
            <button className="text-left text-white hover:text-[#FFD700] font-medium" data-testid="button-mobile-sign-in">
              Sign in
            </button>
            <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-6 py-2.5 rounded-full font-semibold" data-testid="button-mobile-get-started">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
