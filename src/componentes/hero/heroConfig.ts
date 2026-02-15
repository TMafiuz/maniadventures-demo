export type RegionKey = "sierra" | "costa" | "selva";

export const INTRO_IMAGES = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"];

export const REGION_ORDER: RegionKey[] = ["sierra", "costa", "selva"];

export const REGION_IMAGES: Record<RegionKey, string> = {
  sierra: "/sierra.jpg",
  costa: "/costa.jpg",
  selva: "/selva.jpg",
};

export const TIMINGS = {
  introTotalMs: 3000,
  introStepMs: 500,
  regionStepMs: 3000,
};
