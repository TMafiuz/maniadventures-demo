import { Link } from "react-router-dom";
import TourBadges from "./TourBadges";

type Tour = {
  title: string;
  coverImage?: string;
  category?: string;
  duration?: { label?: string };
  difficulty?: string;
  region?: string;
  priceFromPEN?: number;
  slug: string;
};

export default function TourHero({ tour }: { tour: Tour }) {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const price = (tour.priceFromPEN ?? 0).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  });

  const message = encodeURIComponent(
    `Hola, quiero cotizar el tour "${tour.title}". ¿Me brindan más información?`
  );

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="relative h-[420px] w-full overflow-hidden">
      {/* Imagen */}
      {tour.coverImage && (
        <img
          src={tour.coverImage}
          alt={tour.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Degradado oscuro TOP → BOTTOM */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/20" />

      {/* Contenido */}
      <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-between px-6 py-8 text-white">
        
        {/* Parte superior */}
        <div>
          <Link
            to="/tours"
            className="text-sm font-semibold text-white/80 hover:text-white"
          >
            ← Volver
          </Link>

          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            {tour.title}
          </h1>

          <div className="mt-4">
            <TourBadges
              category={tour.category}
              durationLabel={tour.duration?.label}
              difficulty={tour.difficulty}
              region={tour.region}
            />
          </div>
        </div>

        {/* Parte inferior */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-extrabold">Desde {price}</p>

          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded-full bg-emerald-400 px-8 py-3 text-sm font-bold text-emerald-950 shadow-lg hover:brightness-95"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
