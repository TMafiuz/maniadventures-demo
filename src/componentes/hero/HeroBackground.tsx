type Props = {
  src: string;
  darken: boolean;
};

export default function HeroBackground({ src, darken }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div key={src} className="absolute inset-0 opacity-0 animate-heroFadeIn">
        <div className="absolute inset-0 animate-heroZoomOut">
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>
      <div
        className={[
          "absolute inset-0 transition-opacity duration-700",
          darken ? "bg-slate-950/55 opacity-100" : "bg-slate-950/0 opacity-0",
        ].join(" ")}
      />
    </div>
  );
}
