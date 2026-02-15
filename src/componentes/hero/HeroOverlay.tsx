import { useState } from "react";
import RotatingText from "../../components/RotatingText";
import { Link } from "react-router-dom";

type Props = {
  visible: boolean;
  onRegionIndexChange?: (index: number) => void;
};

const regions = ["Sierra", "Costa", "Selva"];

const regionColors = [
  "bg-amber-600 text-white", // Sierra
  "bg-sky-600 text-white", // Costa
  "bg-emerald-600 text-white", // Selva
];

export default function HeroOverlay({ visible, onRegionIndexChange }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeOnChange =
    typeof onRegionIndexChange === "function" ? onRegionIndexChange : () => {};

  const handleChange = (idx: number) => {
    setCurrentIndex(idx);
    safeOnChange(idx);
  };

  return (
    <div
      className={[
        "relative z-10 mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6",
        "transition-all duration-700",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          ¡Hola aventurero!
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl font-bold text-white sm:text-3xl">
          <span className="align-middle">
            Prepárate para vivir la esencia de la{" "}
          </span>

          <RotatingText
            texts={regions}
            rotationInterval={3000}
            auto
            loop
            onNext={handleChange}
            mainClassName={`!inline-flex !flex-nowrap items-center rounded-md px-3 py-1.5 text-lg font-extrabold leading-none sm:text-2xl transition-colors duration-500 ${
              regionColors[currentIndex]
            }`}
            splitLevelClassName="overflow-hidden"
            staggerFrom="last"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.02}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          />
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/tours"
            className="rounded-full bg-sky-400 px-8 py-3 text-sm font-bold text-sky-950 shadow-lg shadow-sky-400/20 transition-transform hover:scale-105"
          >
            Explorar tours
          </Link>

          <Link
            to="/contact"
            className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur transition-transform hover:scale-105"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  );
}
