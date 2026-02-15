import TourCardRow from "./TourCardRow";
import Pagination from "./Pagination";

type Tour = any;

export default function ToursList({
  loading,
  error,
  items,
}: {
  loading: boolean;
  error: any;
  items: Tour[];
}) {
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
        <p className="font-extrabold">No se pudieron cargar los tours</p>
        <p className="mt-1 text-sm">Revisa tu endpoint del Sheets / Apps Script.</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
        <p className="font-extrabold">Sin resultados</p>
        <p className="mt-1 text-sm text-slate-600">
          Prueba cambiando la región, categoría o dificultad.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {items.map((t: any) => (
        <TourCardRow key={t.slug} tour={t} />
      ))}
    </div>
  );
}

// para usar <ToursList.Pagination />
ToursList.Pagination = Pagination;
