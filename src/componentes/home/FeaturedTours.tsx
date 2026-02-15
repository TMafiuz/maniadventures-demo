import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTours } from "../../context/ToursContext";
import { useTheme } from "../../context/ThemeContext";
import InfiniteCarousel from "../carousel/InfiniteCarousel";
import FeaturedTourCard from "./FeaturedTourCard";

type Tour = {
  slug: string;
  title: string;
  shortDesc?: string;
  coverImage?: string;
  priceFromPEN?: number;
  region?: string;
  isFeatured?: boolean;
};

export default function FeaturedTours() {
  const { tours, loading, error } = useTours();
  const { theme } = useTheme();

  const featured = useMemo(() => {
    return (tours as Tour[]).filter((t) => t?.isFeatured).slice(0, 12);
  }, [tours]);

  if (loading) return null;
  if (error) return null;
  if (!featured.length) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
            Recomendados
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
            Tours destacados
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Selección especial de experiencias populares para tu viaje.
          </p>
        </div>

        <Link
          to="/tours"
          className={`hidden rounded-full px-5 py-2 text-sm font-extrabold text-white sm:inline-flex ${theme.primaryBtn}`}
        >
          Ver todos
        </Link>
      </div>

      <div className="mt-7">
        <InfiniteCarousel
          items={featured}
          autoplayMs={4500}
          gapPx={20}
          className="rounded-2xl"
          renderItem={(tour) => <FeaturedTourCard tour={tour} />}
        />
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          to="/tours"
          className={`inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-extrabold text-white ${theme.primaryBtn}`}
        >
          Ver todos los tours
        </Link>
      </div>
    </section>
  );
}
