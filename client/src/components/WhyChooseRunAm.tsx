import { ShieldCheck, DollarSign, MapPinned, Headphones, Star, Umbrella } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Verified Travelers',
    description: 'All travelers go through identity verification and background checks for your peace of mind.',
  },
  {
    icon: DollarSign,
    title: 'Secure Payments',
    description: 'Payments held in escrow until delivery confirmed. Multiple payment options available.',
  },
  {
    icon: MapPinned,
    title: 'Real-Time Tracking',
    description: 'Track your package every step of the way with live GPS tracking and status updates.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is always here to help with any questions or concerns.',
  },
  {
    icon: Star,
    title: 'Rating System',
    description: 'Transparent reviews and ratings help you choose the best travelers for your deliveries.',
  },
  {
    icon: Umbrella,
    title: 'Insurance Coverage',
    description: 'All deliveries covered by comprehensive insurance for added protection and security.',
  },
];

export default function WhyChooseRunAm() {
  return (
    <section id="benefits" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D6A4F] mb-3 sm:mb-4" data-testid="text-why-choose-title">
            Why Choose RunAm
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600" data-testid="text-why-choose-subtitle">
            Built with safety, security, and convenience at the core
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center" data-testid={`card-benefit-${index}`}>
                <div className="mb-5 flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#2D6A4F]" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3" data-testid={`text-benefit-${index}-title`}>
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed" data-testid={`text-benefit-${index}-description`}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
