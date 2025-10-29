import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Smartphone, Lock, Headphones } from 'lucide-react';

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

export default function CTA() {
  const [email, setEmail] = useState('');

  const handleCreateAccount = () => {
    console.log('Create account with email:', email);
    setEmail('');
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };

  return (
    <section className="py-20 lg:py-24 bg-runam-green text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="text-cta-title">
          Ready to Get Started?
        </h2>
        <p className="text-lg lg:text-xl mb-8 opacity-90" data-testid="text-cta-subtitle">
          Join thousands of users who trust RunAm for their delivery needs. Sign up today and experience the future of peer-to-peer delivery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-2xl mx-auto">
          <Button
            onClick={handleCreateAccount}
            size="lg"
            className="bg-white text-runam-green hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            data-testid="button-create-account"
          >
            Create Account
          </Button>
          <Button
            onClick={handleLearnMore}
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                data-testid={`card-cta-feature-${index}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2" data-testid={`text-cta-feature-${index}-title`}>
                  {feature.title}
                </h3>
                <p className="text-sm opacity-90" data-testid={`text-cta-feature-${index}-description`}>
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
