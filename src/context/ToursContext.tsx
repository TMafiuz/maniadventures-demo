import { createContext, useContext, useEffect, useState } from "react";
import { fetchTours } from "../services/toursApi";
import type { Tour } from "../services/toursApi";

interface ToursContextType {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const ToursContext = createContext<ToursContextType | undefined>(undefined);

export function ToursProvider({ children }: { children: React.ReactNode }) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTours();
      setTours(data);
    } catch (err: any) {
      setError(err.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ToursContext.Provider value={{ tours, loading, error, refresh: load }}>
      {children}
    </ToursContext.Provider>
  );
}

export function useTours() {
  const ctx = useContext(ToursContext);
  if (!ctx) {
    throw new Error("useTours debe usarse dentro de ToursProvider");
  }
  return ctx;
}
