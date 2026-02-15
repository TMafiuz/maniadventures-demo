export type RegionKey = "default" | "Sierra" | "Costa" | "Selva";

export type RegionTheme = {
  key: RegionKey;

  // acentos (para texto, íconos, bordes)
  accentText: string;     // ej: text-amber-800
  accentTextHover: string;// ej: hover:text-amber-900
  accentBorder: string;   // ej: border-amber-200
  accentBgSoft: string;   // ej: bg-amber-50

  // botones principales (si quieres)
  primaryBtn: string;     // ej: bg-amber-700 hover:bg-amber-800

  // logo
  logoSrc: string;
};

export const REGION_THEMES: Record<RegionKey, RegionTheme> = {
  default: {
    key: "default",
    accentText: "text-sky-700",
    accentTextHover: "hover:text-sky-900",
    accentBorder: "border-sky-200",
    accentBgSoft: "bg-sky-50",
    primaryBtn: "bg-sky-600 hover:bg-sky-700",
    logoSrc: "/logo.png",
  },
  Sierra: {
    key: "Sierra",
    accentText: "text-amber-800",
    accentTextHover: "hover:text-amber-950",
    accentBorder: "border-amber-200",
    accentBgSoft: "bg-amber-50",
    primaryBtn: "bg-amber-700 hover:bg-amber-800",
    logoSrc: "/logo_sierra.png",
  },
  Costa: {
    key: "Costa",
    accentText: "text-orange-600",
    accentTextHover: "hover:text-orange-800",
    accentBorder: "border-orange-200",
    accentBgSoft: "bg-orange-50",
    primaryBtn: "bg-orange-600 hover:bg-orange-700",
    logoSrc: "/logo_costa.png",
  },
  Selva: {
    key: "Selva",
    accentText: "text-emerald-700",
    accentTextHover: "hover:text-emerald-900",
    accentBorder: "border-emerald-200",
    accentBgSoft: "bg-emerald-50",
    primaryBtn: "bg-emerald-600 hover:bg-emerald-700",
    logoSrc: "/logo_selva.png",
  },
};

export function normalizeRegion(region?: string): RegionKey {
  if (!region) return "default";
  const r = region.trim().toLowerCase();
  if (r === "sierra") return "Sierra";
  if (r === "costa") return "Costa";
  if (r === "selva") return "Selva";
  return "default";
}
