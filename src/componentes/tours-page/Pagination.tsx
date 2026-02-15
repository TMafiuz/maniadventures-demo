export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const go = (p: number) => onChange(Math.max(1, Math.min(totalPages, p)));

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, page - 3),
    Math.max(0, page - 3) + 5
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={!canPrev}
        onClick={() => go(page - 1)}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={[
            "h-10 w-10 rounded-full text-sm font-extrabold",
            p === page
              ? "bg-slate-900 text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
          ].join(" ")}
        >
          {p}
        </button>
      ))}

      <button
        disabled={!canNext}
        onClick={() => go(page + 1)}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}
