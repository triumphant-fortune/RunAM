import roadBg from '@assets/3770ca3d96ee9ea67bc1e54e199194f52320c22f_1761765621106.jpg';
import vehiclesImage from '@assets/Frame 13_1761765658410.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-[70px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={roadBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content - Positioned in upper sky/cloud area */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-20 md:pt-24 lg:pt-32">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px] font-bold text-[#FFD700] mb-4 sm:mb-6 leading-none" data-testid="text-hero-title">
          RunAM
        </h1>
        
        {/* Tagline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal mb-4 sm:mb-6 leading-relaxed" data-testid="text-hero-tagline">
          Your Route. Their Package. One Simple Connection.
        </h2>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-4" data-testid="text-hero-subtitle">
          Join Africa's peer-to-peer delivery network where every trip can earn you more, and every package arrives faster.
        </p>

        <button className="bg-[#2D8A54] hover:bg-[#2D8A54]/90 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg font-semibold rounded-lg transition-colors" data-testid="button-hero-get-started">
          Get Started
        </button>
      </div>

      {/* Vehicles on Road - Bottom right, on the road */}
      <div className="absolute bottom-0 right-4 sm:right-8 md:right-12 lg:right-20 xl:right-32 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[450px] z-0">
        <img src={vehiclesImage} alt="" className="w-full h-auto object-contain" />
      </div>
    </section>
  );
}
