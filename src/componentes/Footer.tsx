import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img src={theme.logoSrc} alt="ManiAdventures" className="h-10 w-auto" />
              <span className={`text-xl font-extrabold tracking-tight ${theme.accentText}`}>
                ManiAdventures
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Agencia de turismo especializada en experiencias inolvidables en Cusco y el Perú.
            </p>
          </div>

          <div>
            <p className={`text-sm font-extrabold ${theme.accentText}`}>Enlaces</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/tours" className={`${theme.accentTextHover}`}>Tours</Link></li>
              <li><Link to="/about" className={`${theme.accentTextHover}`}>Nosotros</Link></li>
              <li><Link to="/contact" className={`${theme.accentTextHover}`}>Contacto</Link></li>
            </ul>
          </div>

          <div>
            <p className={`text-sm font-extrabold ${theme.accentText}`}>Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/policies/privacy" className={`${theme.accentTextHover}`}>Privacidad</Link></li>
              <li><Link to="/policies/terms" className={`${theme.accentTextHover}`}>Términos</Link></li>
            </ul>
          </div>

          <div>
            <p className={`text-sm font-extrabold ${theme.accentText}`}>Atención</p>
            <p className="mt-3 text-sm text-slate-600">Cusco, Perú</p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {year} ManiAdventures. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
