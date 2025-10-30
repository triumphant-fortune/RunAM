import { Wallet, Clock, Heart, TrendingUp } from 'lucide-react';
import travelerImage from '@assets/generated_images/Traveler_with_backpack_at_station_4199c77d.png';

const features = [
  {
    icon: Wallet,
    title: 'Earn Extra Income',
    description: 'Make money from trips you\'re already taking',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose deliveries that fit your travel plans',
  },
  {
    icon: Heart,
    title: 'Help Others',
    description: 'Connect people and make a positive impact',
  },
  {
    icon: TrendingUp,
    title: 'Build Reputation',
    description: 'Earn ratings and become a trusted traveler',
  },
];

export default function ForTravelers() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={travelerImage} alt="Traveler with backpack" className="w-full h-full object-cover" data-testid="img-traveler" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D6A4F] mb-3 sm:mb-4" data-testid="text-for-travelers-title">
              For Travelers
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10" data-testid="text-for-travelers-subtitle">
              Turn your travel plans into earning opportunities while helping others
            </p>

            <div className="space-y-5 sm:space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4" data-testid={`feature-traveler-${index}`}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#DDD6FE] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1" data-testid={`text-traveler-feature-${index}-title`}>
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600" data-testid={`text-traveler-feature-${index}-description`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
