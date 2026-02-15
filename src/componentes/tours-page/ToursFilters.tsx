export type RegionFilter = "Todos" | "Costa" | "Sierra" | "Selva";

export type FiltersState = {
  region: RegionFilter;
  categories: string[];
  difficulties: string[];
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
      {children}
    </p>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

export default function ToursFilters({
  value,
  onChange,
  categories,
  difficulties,
}: {
  value: FiltersState;
  onChange: (v: FiltersState) => void;
  categories: string[];
  difficulties: string[];
}) {
  const setRegion = (region: RegionFilter) => onChange({ ...value, region });

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  const clearAll = () =>
    onChange({ region: "Todos", categories: [], difficulties: [] });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Filtros</h2>
          <p className="mt-1 text-xs text-slate-500">Ajusta tu búsqueda</p>
        </div>

        <button
          onClick={clearAll}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          Limpiar
        </button>
      </div>

      {/* Región */}
      <div className="mt-6">
        <SectionTitle>Región</SectionTitle>
        <div className="mt-3 grid gap-2">
          {(["Todos", "Costa", "Sierra", "Selva"] as RegionFilter[]).map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
              <input
                type="radio"
                name="region"
                checked={value.region === r}
                onChange={() => setRegion(r)}
                className="h-4 w-4 accent-slate-900"
              />
              <span className="font-semibold">{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categoría */}
      <div className="mt-6">
        <SectionTitle>Categoría</SectionTitle>
        <div className="mt-3 grid gap-2">
          {categories.length ? (
            categories.map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={value.categories.includes(c)}
                  onChange={() => onChange({ ...value, categories: toggle(value.categories, c) })}
                  className="h-4 w-4 accent-slate-900"
                />
                <span>{c}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-slate-500">—</p>
          )}
        </div>

        {value.categories.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {value.categories.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        ) : null}
      </div>

      {/* Dificultad */}
      <div className="mt-6">
        <SectionTitle>Dificultad</SectionTitle>
        <div className="mt-3 grid gap-2">
          {difficulties.length ? (
            difficulties.map((d) => (
              <label key={d} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={value.difficulties.includes(d)}
                  onChange={() => onChange({ ...value, difficulties: toggle(value.difficulties, d) })}
                  className="h-4 w-4 accent-slate-900"
                />
                <span>{d}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-slate-500">—</p>
          )}
        </div>

        {value.difficulties.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {value.difficulties.map((d) => (
              <Chip key={d}>{d}</Chip>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
