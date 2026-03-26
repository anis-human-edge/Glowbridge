import Hero from '../../components/public/home/Hero';
import ValueProp from '../../components/public/home/ValueProp';
import DiscoveryEngine from '../../components/public/home/DiscoveryEngine';
import EventSystem from '../../components/public/home/EventSystem';
import Ecosystem from '../../components/public/home/Ecosystem';
import CreatorLadder from '../../components/public/home/CreatorLadder';
import BrandMonetization from '../../components/public/home/BrandMonetization';
import TrustSection from '../../components/public/home/TrustSection';
import Cta from '../../components/public/home/Cta';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ValueProp />
      <DiscoveryEngine />
      <EventSystem />
      <Ecosystem />
      <CreatorLadder />
      <BrandMonetization />
      <TrustSection />
      <Cta />
    </div>
  );
}
