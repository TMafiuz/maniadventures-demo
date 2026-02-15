import { Mountain, Umbrella, Trees, Clock, Star } from "lucide-react";

function Badge({ icon, children }: any) {
  return (
    <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-md">
      {icon}
      {children}
    </span>
  );
}

function RegionIcon({ region }: { region?: string }) {
  switch (region) {
    case "Sierra":
      return <Mountain size={16} />;
    case "Costa":
      return <Umbrella size={16} />;
    case "Selva":
      return <Trees size={16} />;
    default:
      return null;
  }
}

export default function TourBadges({
  category,
  durationLabel,
  difficulty,
  region,
}: any) {
  return (
    <div className="flex flex-wrap gap-3">
      {category && <Badge icon={<Star size={16} />}>{category}</Badge>}
      {durationLabel && <Badge icon={<Clock size={16} />}>{durationLabel}</Badge>}
      {difficulty && <Badge icon={<Star size={16} />}>{difficulty}</Badge>}
      {region && (
        <Badge icon={<RegionIcon region={region} />}>
          {region}
        </Badge>
      )}
    </div>
  );
}
