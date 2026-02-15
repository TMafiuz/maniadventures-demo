import { useEffect, useMemo, useState } from "react";
import { INTRO_IMAGES, REGION_IMAGES, REGION_ORDER, TIMINGS, type RegionKey } from "./heroConfig";

type Phase = "intro" | "main";

export function useHeroSequence() {
  const [phase, setPhase] = useState<Phase>("intro");

  const [introIndex, setIntroIndex] = useState(0);

  // Controlado desde RotatingText
  const [regionIndex, setRegionIndex] = useState(0);

  const region = useMemo<RegionKey>(() => REGION_ORDER[regionIndex], [regionIndex]);

  const backgroundSrc = useMemo(() => {
    if (phase === "intro") return INTRO_IMAGES[introIndex];
    return REGION_IMAGES[region];
  }, [phase, introIndex, region]);

  useEffect(() => {
    if (phase !== "intro") return;

    const steps = INTRO_IMAGES.length;

    const id = window.setInterval(() => {
      setIntroIndex((prev) => (prev + 1) % steps);
    }, TIMINGS.introStepMs);

    const doneId = window.setTimeout(() => {
      window.clearInterval(id);
      setPhase("main");
    }, TIMINGS.introTotalMs);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(doneId);
    };
  }, [phase]);

  return {
    phase,
    backgroundSrc,
    regionIndex,
    setRegionIndex,
  };
}
