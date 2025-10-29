import roadBg from '@assets/3770ca3d96ee9ea67bc1e54e199194f52320c22f_1761765621106.jpg';
import vehiclesImage from '@assets/Frame 13_1761765658410.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-[70px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={roadBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content - Positioned in upper sky area */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-12 sm:pt-16 md:pt-20 lg:pt-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#FFD700] mb-3 sm:mb-4 md:mb-6" data-testid="text-hero-title">
          RunAM
        </h1>
        
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-normal mb-3 sm:mb-4 md:mb-6 px-2" data-testid="text-hero-tagline">
          Your Route. Their Package. One Simple Connection.
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 lg:mb-10 px-2" data-testid="text-hero-subtitle">
          Join Africa's peer-to-peer delivery network where every trip can earn you more, and every package arrives faster.
        </p>

        <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full transition-colors" data-testid="button-hero-get-started">
          Get Started
        </button>
      </div>

      {/* Vehicles on Road - Responsive positioning */}
      <div className="absolute bottom-0 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-12 right-0 sm:right-4 md:right-8 lg:right-12 xl:right-24 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-96 z-0">
        <img src={vehiclesImage} alt="" className="w-full h-auto object-contain" />
      </div>
    </section>
  );
}
