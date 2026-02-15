import TourSection from "./TourSection";

type ItineraryItem = { title: string; desc?: string };

export default function TourItinerary({ itinerary }: { itinerary?: ItineraryItem[] }) {
  return (
    <TourSection title="Itinerario">
      {itinerary?.length ? (
        <ol className="mt-4 space-y-4">
          {itinerary.map((step, idx) => (
            <li key={idx} className="flex gap-4">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-extrabold text-white">
                {idx + 1}
              </div>
              <div>
                <p className="font-extrabold text-slate-900">{step.title}</p>
                {step.desc ? (
                  <p className="mt-1 text-sm text-slate-700">{step.desc}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-slate-500">
          Este tour aún no tiene itinerario detallado.
        </p>
      )}
    </TourSection>
  );
}
