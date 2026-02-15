import { useEffect, useMemo, useRef, useState } from "react";

type Props<T> = {
  items: T[];
  autoplayMs?: number;
  gapPx?: number;
  className?: string;
  renderItem: (item: T, idx: number) => React.ReactNode;
};

export default function InfiniteCarousel<T>({
  items,
  autoplayMs = 4500,
  gapPx = 20,
  className,
  renderItem,
}: Props<T>) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Estados de control estrictos
  const isPointerDownRef = useRef(false); // ¿Está el botón presionado?
  const draggingRef = useRef(false);      // ¿Estamos en modo "arrastre"?
  const movedRef = useRef(false);         // ¿Hubo movimiento suficiente?
  
  const startXRef = useRef(0);
  const startLeftRef = useRef(0);
  const vRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const momentumRafRef = useRef<number | null>(null);

  const loopItems = useMemo(() => {
    if (!items.length) return [];
    return [...items, ...items, ...items];
  }, [items]);

  const getStep = () => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    const card = vp.querySelector<HTMLElement>("[data-carousel-card]");
    return card ? card.getBoundingClientRect().width + gapPx : 0;
  };

  const updateActiveIndex = () => {
    const vp = viewportRef.current;
    if (!vp || !items.length) return;
    const step = getStep();
    if (!step) return;
    const block = items.length * step;
    const relativeLeft = (vp.scrollLeft - block + step / 2) % block;
    const idx = Math.floor(((relativeLeft + block) % block) / step);
    setActiveIndex(idx);
  };

  const recenterIfNeeded = (isDragging = false) => {
    const vp = viewportRef.current;
    if (!vp || !items.length) return;
    const step = getStep();
    const block = items.length * step;
    const left = vp.scrollLeft;

    if (left < block * 0.5) {
      vp.scrollLeft = left + block;
      if (isDragging) startLeftRef.current += block;
    } else if (left > block * 1.5) {
      vp.scrollLeft = left - block;
      if (isDragging) startLeftRef.current -= block;
    }
    updateActiveIndex();
  };

  const snapToNearest = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const step = getStep();
    const target = Math.round(vp.scrollLeft / step) * step;
    
    vp.style.scrollBehavior = "smooth";
    vp.scrollLeft = target;
    
    setTimeout(() => {
      if (vp) {
        vp.style.scrollBehavior = "auto";
        updateActiveIndex();
      }
    }, 400);
  };

  const startAutoplay = () => {
    if (!autoplayMs) return;
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      const vp = viewportRef.current;
      if (!vp || draggingRef.current || isPointerDownRef.current) return;
      const step = getStep();
      vp.style.scrollBehavior = "smooth";
      vp.scrollBy({ left: step });
      setTimeout(() => {
        if (vp) {
          vp.style.scrollBehavior = "auto";
          recenterIfNeeded();
        }
      }, 500);
    }, autoplayMs);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !items.length) return;

    // Init
    const step = getStep();
    vp.scrollLeft = items.length * step;
    updateActiveIndex();
    startAutoplay();

    const onPointerDown = (e: PointerEvent) => {
      // 1. Verificar que sea click izquierdo (0)
      if (e.button !== 0) return;
      
      // 2. Marcar que el botón está presionado
      isPointerDownRef.current = true;
      draggingRef.current = false;
      movedRef.current = false;

      startXRef.current = e.clientX;
      startLeftRef.current = vp.scrollLeft;
      lastXRef.current = e.clientX;
      lastTRef.current = performance.now();

      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      stopAutoplay();
      vp.style.scrollBehavior = "auto";
    };

    const onPointerMove = (e: PointerEvent) => {
      // ⚠️ EL GUARDIA: Si no hay botón presionado, abortar todo.
      if (!isPointerDownRef.current || e.buttons !== 1) {
        if (isPointerDownRef.current) endInteraction(e); // Limpieza de emergencia
        return;
      }

      const dx = e.clientX - startXRef.current;

      // Iniciar drag solo tras superar umbral
      if (!draggingRef.current && Math.abs(dx) > 10) {
        draggingRef.current = true;
        movedRef.current = true;
        vp.setPointerCapture(e.pointerId);
        vp.classList.remove("snap-x", "snap-mandatory");
      }

      if (draggingRef.current) {
        vp.scrollLeft = startLeftRef.current - dx;
        recenterIfNeeded(true);

        const now = performance.now();
        const dt = now - lastTRef.current;
        if (dt > 0) vRef.current = (e.clientX - lastXRef.current) / dt;
        lastXRef.current = e.clientX;
        lastTRef.current = now;
      }
    };

    const endInteraction = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      
      isPointerDownRef.current = false;

      if (draggingRef.current) {
        vp.releasePointerCapture(e.pointerId);
        draggingRef.current = false;
        vp.classList.add("snap-x", "snap-mandatory");
        
        // Momentum
        if (Math.abs(vRef.current) > 0.2) {
          const runMomentum = () => {
            vRef.current *= 0.95;
            vp.scrollLeft -= vRef.current * 16;
            recenterIfNeeded();
            if (Math.abs(vRef.current) > 0.1) {
              momentumRafRef.current = requestAnimationFrame(runMomentum);
            } else {
              snapToNearest();
            }
          };
          momentumRafRef.current = requestAnimationFrame(runMomentum);
        } else {
          snapToNearest();
        }
      } else {
        snapToNearest();
      }
      
      startAutoplay();
    };

    const onClickCapture = (e: MouseEvent) => {
      if (movedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        movedRef.current = false;
      }
    };

    vp.addEventListener("pointerdown", onPointerDown);
    vp.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endInteraction);
    window.addEventListener("pointercancel", endInteraction);
    vp.addEventListener("click", onClickCapture, true);

    return () => {
      stopAutoplay();
      vp.removeEventListener("pointerdown", onPointerDown);
      vp.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endInteraction);
      window.removeEventListener("pointercancel", endInteraction);
      vp.removeEventListener("click", onClickCapture, true);
    };
  }, [items.length]);

  return (
    <div className="group relative">
      <div
        ref={viewportRef}
        className={[
          "overflow-x-auto scrollbar-none select-none touch-pan-y",
          "snap-x snap-mandatory active:cursor-grabbing",
          className ?? "",
        ].join(" ")}
      >
        <div className="flex" style={{ gap: `${gapPx}px` }}>
          {loopItems.map((item, idx) => (
            <div
              key={idx}
              data-carousel-card={idx === 0 ? "1" : "0"}
              className="snap-start shrink-0"
            >
              {renderItem(item, idx % items.length)}
            </div>
          ))}
        </div>
      </div>

      {/* Puntos de navegación */}
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const vp = viewportRef.current;
              if (!vp) return;
              const step = getStep();
              const block = items.length * step;
              vp.style.scrollBehavior = "smooth";
              vp.scrollLeft = block + i * step;
              setTimeout(() => { if(vp) vp.style.scrollBehavior = "auto"; }, 500);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-8 bg-slate-800" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}