import HeroBackground from "./HeroBackground";
import HeroOverlay from "./HeroOverlay";
import { useHeroSequence } from "./useHeroSequence";

export default function Hero() {
  const { phase, backgroundSrc, setRegionIndex } = useHeroSequence();
  const isMain = phase === "main";

  return (
    <section className="relative min-h-[70vh] w-full">
      <HeroBackground src={backgroundSrc} darken={isMain} />

      <HeroOverlay
        visible={isMain}
        onRegionIndexChange={(idx) => setRegionIndex(idx)}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
