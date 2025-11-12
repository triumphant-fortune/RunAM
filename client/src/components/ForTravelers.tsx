import { Wallet, Clock, Heart, TrendingUp } from 'lucide-react';
import travelerImage from '@assets/stock_images/african_business_tra_7ec13f34.jpg';

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
    <section className="py-20 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={travelerImage} alt="Traveler with backpack" className="w-full h-full object-cover" data-testid="img-traveler" />
            </div>
          </div>

          <div>
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-[#2D6A4F] mb-4 sm:mb-4" data-testid="text-for-travelers-title">
              For Travelers
            </h2>
            <p className="text-lg sm:text-lg lg:text-xl text-gray-600 mb-10 sm:mb-10" data-testid="text-for-travelers-subtitle">
              Turn your travel plans into earning opportunities while helping others
            </p>

            <div className="space-y-6 sm:space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-5" data-testid={`feature-traveler-${index}`}>
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#DDD6FE] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#7C3AED]" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-2" data-testid={`text-traveler-feature-${index}-title`}>
                        {feature.title}
                      </h3>
                      <p className="text-base sm:text-base text-gray-600" data-testid={`text-traveler-feature-${index}-description`}>
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
