import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

type Tour = {
  slug: string;
  title: string;
  shortDesc?: string;
  coverImage?: string;
  priceFromPEN?: number;
  region?: string;
};

export default function FeaturedTourCard({ tour }: { tour: Tour }) {
  const { theme } = useTheme();

  const price = (tour.priceFromPEN ?? 0).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  });

  return (
    <article
      className={[
        // ✅ Mobile 1 visible, Desktop 3 visibles exactos
        "w-[calc(100vw-3rem)] sm:w-[420px]",
        "md:w-[calc((1280px-3rem-2*1.25rem)/3)]", // si tu contenedor es max 1280
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
      ].join(" ")}
    >
      <div className="relative h-44 w-full">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

        {tour.region ? (
          <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-extrabold text-slate-800">
            {tour.region}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">
          {tour.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {tour.shortDesc || "—"}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm font-extrabold text-slate-900">
            Desde <span className={theme.accentText}>{price}</span>
          </p>

          <Link
            to={`/tours/${tour.slug}`}
            className={`rounded-full px-4 py-2 text-xs font-extrabold text-white ${theme.primaryBtn}`}
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
