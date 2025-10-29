import { MapPin, Users, Shield, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: MapPin,
    title: 'Post Your Delivery',
    description: 'Share what you need delivered, where it\'s going, and when you need it there. Set your price and requirements.',
  },
  {
    number: 2,
    icon: Users,
    title: 'Match with Travelers',
    description: 'Our platform connects you with verified travelers heading your way. Review profiles, ratings, and choose the best match.',
  },
  {
    number: 3,
    icon: Shield,
    title: 'Secure Handoff',
    description: 'Meet at safe public locations. Verify identity, inspect package, and confirm pickup through our secure app.',
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'Track & Receive',
    description: 'Track your package in real-time. Confirm delivery and release payment. Rate your experience to help the community.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-lg lg:text-xl text-gray-600" data-testid="text-how-it-works-subtitle">
            Simple, secure, and efficient delivery in four easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                data-testid={`card-step-${step.number}`}
              >
                <div className="absolute -top-3 left-6">
                  <div className="bg-runam-green text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                </div>

                <div className="mb-4 mt-2">
                  <div className="h-16 w-16 rounded-full bg-runam-green/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-runam-green" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid={`text-step-${step.number}-title`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" data-testid={`text-step-${step.number}-description`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
