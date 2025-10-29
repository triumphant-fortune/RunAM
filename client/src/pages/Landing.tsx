import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseRunAm from '@/components/WhyChooseRunAm';
import ForSenders from '@/components/ForSenders';
import ForTravelers from '@/components/ForTravelers';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <WhyChooseRunAm />
      <ForSenders />
      <ForTravelers />
      <CTA />
      <Footer />
    </div>
  );
}
