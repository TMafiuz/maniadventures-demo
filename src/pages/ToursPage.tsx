import { useEffect, useMemo, useState } from "react";
import { useTours } from "../context/ToursContext";
import { useTheme } from "../context/ThemeContext";
import { normalizeRegion } from "../utils/regionTheme";
import type { FiltersState } from "../componentes/tours-page/ToursFilters";

import ToursHero from "../componentes/tours-page/ToursHero";
import ToursFilters from "../componentes/tours-page/ToursFilters";
import ToursList from "../componentes/tours-page/ToursList";

const PAGE_SIZE = 5;

export default function ToursPage() {
  const { tours, loading, error, refresh } = useTours();
  const { setRegionKey, resetTheme } = useTheme();

  const [filters, setFilters] = useState<FiltersState>({
    region: "Todos",
    categories: [],
    difficulties: [],
  });

  const [page, setPage] = useState(1);

  // ✅ theme por región (Todos => default)
  useEffect(() => {
    if (filters.region === "Todos") {
      resetTheme();
      return;
    }
    setRegionKey(normalizeRegion(filters.region));
  }, [filters.region, setRegionKey, resetTheme]);

  // ✅ al salir de ToursPage, vuelve a default
  useEffect(() => {
    return () => resetTheme();
  }, [resetTheme]);

  // ✅ listas para checkboxes (de tus tours reales)
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((t: any) => t?.category && set.add(String(t.category)));
    return Array.from(set).sort();
  }, [tours]);

  const availableDifficulties = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((t: any) => t?.difficulty && set.add(String(t.difficulty)));
    return Array.from(set).sort();
  }, [tours]);

  // ✅ filtrado
  const filtered = useMemo(() => {
    const region = filters.region;

    return tours.filter((t: any) => {
      if (!t) return false;

      // región (solo 1)
      if (region !== "Todos" && String(t.region).toLowerCase() !== region.toLowerCase()) {
        return false;
      }

      // categorías (0 => no filtra)
      if (filters.categories.length) {
        if (!filters.categories.includes(String(t.category))) return false;
      }

      // dificultades (0 => no filtra)
      if (filters.difficulties.length) {
        if (!filters.difficulties.includes(String(t.difficulty))) return false;
      }

      return true;
    });
  }, [tours, filters]);

  // ✅ paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  // cuando cambian filtros, vuelve a página 1
  useEffect(() => {
    setPage(1);
  }, [filters.region, filters.categories, filters.difficulties]);

  return (
    <div className="bg-slate-50">
      <ToursHero region={filters.region} />

      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <ToursFilters
              value={filters}
              onChange={setFilters}
              categories={availableCategories}
              difficulties={availableDifficulties}
            />
          </aside>

          {/* List */}
          <section>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Mostrando <span className="font-bold text-slate-900">{filtered.length}</span> tours
              </p>

              {error ? (
                <button
                  onClick={refresh}
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Reintentar carga
                </button>
              ) : null}
            </div>

            <ToursList
              loading={loading}
              error={error}
              items={pageItems}
            />

            {/* Pagination */}
            {!loading && !error && filtered.length > 0 ? (
              <div className="mt-8">
                <ToursList.Pagination
                  page={safePage}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
