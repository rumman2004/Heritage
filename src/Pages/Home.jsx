import HeroSection    from '../components/sections/HeroSection';
import OriginStory    from '../components/sections/OriginStory';
import FarmingProcess from '../components/sections/FarmingProcess';
import ProductReveal  from '../components/sections/ProductReveal';
import BrewingGuide   from '../components/sections/BrewingGuide';
import CtaSection     from '../components/sections/CtaSection';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <HeroSection />
      <OriginStory />
      <FarmingProcess />
      <ProductReveal />
      <BrewingGuide />
      <CtaSection />
    </div>
  );
}