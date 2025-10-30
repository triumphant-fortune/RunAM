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
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D6A4F] mb-3 sm:mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600" data-testid="text-how-it-works-subtitle">
            Simple, secure, and efficient delivery in four easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative bg-white rounded-xl p-6 text-center" data-testid={`card-step-${step.number}`}>
                {/* Numbered Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#2D6A4F] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 mt-4 flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#2D6A4F]" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3" data-testid={`text-step-${step.number}-title`}>
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed" data-testid={`text-step-${step.number}-description`}>
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
