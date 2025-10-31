import { Smartphone, Lock, Headphones } from 'lucide-react';

interface CTAProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Available on iOS and Android',
  },
  {
    icon: Lock,
    title: 'Secure Platform',
    description: 'Bank-level encryption',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
  },
];

export default function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-24 lg:py-24 bg-[#2D8A54] text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-5" data-testid="text-cta-title">
          Ready to Get Started?
        </h2>
        <p className="text-xl lg:text-xl mb-10 opacity-90" data-testid="text-cta-subtitle">
          Join thousands of users who trust RunAm for their delivery needs. Sign up today and experience the future of peer-to-peer delivery.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16 max-w-2xl mx-auto">
          <button onClick={onGetStarted} className="bg-white text-[#2D8A54] hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-full transition-colors min-h-[56px]" data-testid="button-create-account">
            Create Account
          </button>
          <button className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold rounded-full transition-colors min-h-[56px]" data-testid="button-learn-more">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-7" data-testid={`card-cta-feature-${index}`}>
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid={`text-cta-feature-${index}-title`}>
                  {feature.title}
                </h3>
                <p className="text-base opacity-90" data-testid={`text-cta-feature-${index}-description`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
