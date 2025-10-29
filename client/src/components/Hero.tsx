import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Highway_road_hero_background_de9198e2.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Highway background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
          style={{ color: '#FFD700' }}
          data-testid="text-hero-title"
        >
          RunAM
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-normal mb-6" data-testid="text-hero-tagline">
          Your Route. Their Package. One Simple Connection.
        </h2>

        <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-10" data-testid="text-hero-subtitle">
          Join Africa's peer-to-peer delivery network where every trip can earn you more, and every package arrives faster.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={() => console.log('Get Started clicked')}
            size="lg"
            className="bg-runam-green hover:bg-runam-green/90 text-white px-10 py-6 text-lg font-semibold rounded-full"
            data-testid="button-hero-get-started"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
