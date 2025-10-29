import roadBg from '@assets/3770ca3d96ee9ea67bc1e54e199194f52320c22f_1761765621106.jpg';
import vehiclesImage from '@assets/Frame 13_1761765658410.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[70px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={roadBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-8">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#FFD700] mb-4 sm:mb-6" data-testid="text-hero-title">
          RunAM
        </h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-normal mb-4 sm:mb-6 px-2" data-testid="text-hero-tagline">
          Your Route. Their Package. One Simple Connection.
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-10 px-2" data-testid="text-hero-subtitle">
          Join Africa's peer-to-peer delivery network where every trip can earn you more, and every package arrives faster.
        </p>

        <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-colors" data-testid="button-hero-get-started">
          Get Started
        </button>
      </div>

      {/* Vehicles on Road - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:block absolute bottom-8 lg:bottom-12 right-8 lg:right-16 xl:right-24 w-64 lg:w-72 xl:w-96">
        <img src={vehiclesImage} alt="" className="w-full h-auto object-contain" />
      </div>
    </section>
  );
}
