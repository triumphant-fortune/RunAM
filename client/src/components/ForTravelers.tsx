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
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={travelerImage}
                alt="Traveler with backpack"
                className="w-full h-full object-cover"
                data-testid="img-traveler"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-for-travelers-title">
              For Travelers
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8" data-testid="text-for-travelers-subtitle">
              Turn your travel plans into earning opportunities while helping others
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4" data-testid={`feature-traveler-${index}`}>
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-runam-green/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-runam-green" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1" data-testid={`text-traveler-feature-${index}-title`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600" data-testid={`text-traveler-feature-${index}-description`}>
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
