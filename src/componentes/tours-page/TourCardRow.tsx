import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import TourBadges from "../tour-detail/TourBadges"; // reutiliza tus badges mejorados (si ya lo tienes)

type Tour = {
  slug: string;
  title: string;
  shortDesc?: string;
  coverImage?: string;
  category?: string;
  difficulty?: string;
  region?: string;
  duration?: { label?: string };
  priceFromPEN?: number;
};

export default function TourCardRow({ tour }: { tour: Tour }) {
  const { theme } = useTheme();

  const pricePEN = (tour.priceFromPEN ?? 0).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  });

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[320px_1fr]">
        {/* Imagen fija */}
        <div className="relative h-44 w-full sm:h-52 md:h-full md:min-h-[220px]">
          {tour.coverImage ? (
            <img
              src={tour.coverImage}
              alt={tour.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200" />
          )}

          {/* overlay suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

          {/* tag región arriba */}
          {tour.region ? (
            <div className="absolute left-3 top-3">
              <span className={`rounded-full border bg-white/90 px-3 py-1 text-xs font-extrabold ${theme.accentText} ${theme.accentBorder}`}>
                {tour.region}
              </span>
            </div>
          ) : null}
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-between p-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 md:text-xl">
              {tour.title}
            </h3>

            <div className="mt-3">
              <TourBadges
                category={tour.category}
                durationLabel={tour.duration?.label}
                difficulty={tour.difficulty}
                region={tour.region}
              />
            </div>

            <p className="mt-3 line-clamp-3 text-sm text-slate-600">
              {tour.shortDesc || "—"}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-extrabold text-slate-900">
              Desde <span className={`${theme.accentText}`}>{pricePEN}</span>
            </p>

            <Link
              to={`/tours/${tour.slug}`}
              className={`inline-flex justify-center rounded-full px-6 py-2.5 text-sm font-extrabold text-white ${theme.primaryBtn}`}
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
