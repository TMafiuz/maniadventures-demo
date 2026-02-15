import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useTours } from "../context/ToursContext";
import { useTheme } from "../context/ThemeContext";
import { normalizeRegion } from "../utils/regionTheme";

import TourDetailSkeleton from "../componentes/tour-detail/TourDetailSkeleton";
import TourHero from "../componentes/tour-detail/TourHero";
import TourSection from "../componentes/tour-detail/TourSection";
import TourIncludesExcludes from "../componentes/tour-detail/TourIncludesExcludes";
import TourItinerary from "../componentes/tour-detail/TourItinerary";

export default function TourDetail() {
  const { slug } = useParams();
  const { tours, loading, error, refresh } = useTours();

  const { theme, setRegionKey, resetTheme } = useTheme();

  const tour = useMemo(() => {
    if (!slug) return undefined;
    return tours.find((t: any) => t.slug === slug);
  }, [tours, slug]);

  useEffect(() => {
    if (!tour?.region) {
      resetTheme();
      return;
    }
    setRegionKey(normalizeRegion(tour.region));
  }, [tour, setRegionKey, resetTheme]);

  useEffect(() => {
    return () => resetTheme();
  }, [resetTheme]);

  if (loading) return <TourDetailSkeleton />;

  if (error) {
    return (
      <div className="mx-auto max-w-[1100px] px-6 py-10">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Ocurrió un error
        </h1>
        <p className="mt-2 text-slate-600">No se pudo cargar el tour.</p>

        <button
          onClick={refresh}
          className={`mt-6 rounded-full px-6 py-3 text-sm font-bold text-white ${theme.primaryBtn}`}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-[1100px] px-6 py-10">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Tour no encontrado
        </h1>
        <p className="mt-2 text-slate-600">
          No existe un tour con el slug:{" "}
          <span className="font-mono">{slug}</span>
        </p>

        <Link
          to="/tours"
          className={`mt-6 inline-flex rounded-full px-6 py-3 text-sm font-bold text-white ${theme.primaryBtn}`}
        >
          Volver a Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <TourHero tour={tour} />

      <div className="mx-auto max-w-[1100px] px-6 py-10">
        <TourSection title="Descripción">
          <p className="whitespace-pre-line text-slate-700">
            {tour.shortDesc || "Sin descripción."}
          </p>
        </TourSection>

        <div className="mt-8">
          <TourItinerary itinerary={tour.itinerary} />
        </div>

        <div className="mt-8">
          <TourIncludesExcludes
            includes={tour.includes}
            excludes={tour.excludes}
          />
        </div>
      </div>
    </div>
  );
}
