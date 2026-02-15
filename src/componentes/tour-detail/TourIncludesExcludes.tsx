import TourSection from "./TourSection";

function List({ items, dotColor }: { items?: string[]; dotColor: "sky" | "slate" }) {
  if (!items?.length) return <p className="mt-2 text-sm text-slate-500">—</p>;

  const dot = dotColor === "sky" ? "bg-sky-600" : "bg-slate-500";

  return (
    <ul className="mt-3 space-y-2 text-sm text-slate-700">
      {items.map((x, i) => (
        <li key={i} className="flex gap-2">
          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TourIncludesExcludes({
  includes,
  excludes,
}: {
  includes?: string[];
  excludes?: string[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TourSection title="Incluye">
        <List items={includes} dotColor="sky" />
      </TourSection>

      <TourSection title="No incluye">
        <List items={excludes} dotColor="slate" />
      </TourSection>
    </div>
  );
}
