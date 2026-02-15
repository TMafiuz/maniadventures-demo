import { useMemo } from "react";

export type RegionFilter = "Todos" | "Costa" | "Sierra" | "Selva";

const HERO_BY_REGION: Record<RegionFilter, { title: string; subtitle: string; image: string }> = {
  Todos: {
    title: "Explora nuestros tours",
    subtitle: "Elige la experiencia que más se adapte a ti: cultura, aventura y paisajes inolvidables.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80",
  },
  Sierra: {
    title: "Tours en la Sierra del Perú",
    subtitle: "Montañas, historia y rutas andinas. Encuentra tu aventura ideal en altura.",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1600&q=80",
  },
  Costa: {
    title: "Tours en la Costa del Perú",
    subtitle: "Sol, mar y experiencias inolvidables. Descubre la costa con nosotros.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
  },
  Selva: {
    title: "Tours en la Selva del Perú",
    subtitle: "Naturaleza viva, biodiversidad y aventura. Explora la selva con seguridad.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  },
};

export default function ToursHero({ region }: { region: RegionFilter }) {
  const data = useMemo(() => HERO_BY_REGION[region], [region]);

  return (
    <div className="relative overflow-hidden">
      <div className="h-[260px] w-full sm:h-[320px]">
        {/* key para animación al cambiar región */}
        <div key={region} className="absolute inset-0">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover transition-opacity duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/20" />
        </div>
      </div>

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1280px] items-center px-6">
          <div
            key={`content-${region}`}
            className="max-w-2xl text-white transition-all duration-500"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">
              ManiAdventures
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {data.title}
            </h1>

            <p className="mt-3 text-sm text-white/90 sm:text-base">
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
