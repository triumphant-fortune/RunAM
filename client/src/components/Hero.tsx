import roadBg from '@assets/3770ca3d96ee9ea67bc1e54e199194f52320c22f_1761765621106.jpg';
import vehiclesImage from '@assets/Frame 13_1761765658410.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-[80px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={roadBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content - Positioned in upper sky/cloud area */}
      <div className="relative z-10 text-center px-6 sm:px-6 max-w-5xl mx-auto pt-20 sm:pt-20 md:pt-24 lg:pt-32">
        <h1 className="text-7xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px] font-bold text-[#FFD700] mb-6 sm:mb-6 leading-none" data-testid="text-hero-title">
          RunAM
        </h1>
        
        {/* Tagline */}
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal mb-5 sm:mb-6 leading-relaxed" data-testid="text-hero-tagline">
          Your Route. Their Package. One Simple Connection.
        </h2>
        
        {/* Subtitle */}
        <p className="text-base sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-8 md:mb-10 leading-relaxed px-4" data-testid="text-hero-subtitle">
          Join Africa's peer-to-peer delivery network where every trip can earn you more, and every package arrives faster.
        </p>

        <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-10 sm:px-10 md:px-12 py-4 sm:py-3.5 md:py-4 text-lg sm:text-lg font-semibold rounded-lg transition-colors min-h-[52px]" data-testid="button-hero-get-started">
          Get Started
        </button>
      </div>

      {/* Vehicles on Road - Repositioned higher for mobile visibility */}
      <div className="absolute bottom-8 sm:bottom-0 right-4 sm:right-8 md:right-12 lg:right-20 xl:right-32 w-64 sm:w-64 md:w-80 lg:w-96 xl:w-[450px] z-0">
        <img src={vehiclesImage} alt="" className="w-full h-auto object-contain" />
      </div>
    </section>
  );
}
