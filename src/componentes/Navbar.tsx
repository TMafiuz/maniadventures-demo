import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={theme.logoSrc} alt="ManiAdventures" className="h-10 w-auto" />
          <span className={`text-lg font-extrabold tracking-tight ${theme.accentText}`}>
            ManiAdventures
          </span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link
            to="/tours"
            className={`text-sm font-semibold text-slate-700 ${theme.accentTextHover}`}
          >
            Tours
          </Link>
          <Link
            to="/about"
            className={`text-sm font-semibold text-slate-700 ${theme.accentTextHover}`}
          >
            Nosotros
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-semibold text-slate-700 ${theme.accentTextHover}`}
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
