import { Zap, DollarSign, Calendar, Globe } from 'lucide-react';
import senderImage from '@assets/generated_images/Man_holding_package_box_09554db5.png';

const features = [
  {
    icon: Zap,
    title: 'Faster Delivery',
    description: 'Same-day and next-day delivery options available',
  },
  {
    icon: DollarSign,
    title: 'Lower Costs',
    description: 'Save up to 60% compared to traditional courier services',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Choose delivery times that work for your schedule',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Send packages anywhere with our worldwide traveler network',
  },
];

export default function ForSenders() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-for-senders-title">
              For Senders
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8" data-testid="text-for-senders-subtitle">
              Get your packages delivered faster and more affordably than traditional shipping services
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4" data-testid={`feature-sender-${index}`}>
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-runam-green/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-runam-green" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1" data-testid={`text-sender-feature-${index}-title`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600" data-testid={`text-sender-feature-${index}-description`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={senderImage}
                alt="Person holding package"
                className="w-full h-full object-cover"
                data-testid="img-sender"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
