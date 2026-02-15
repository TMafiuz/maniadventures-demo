export interface Tour {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;

  category?: string;
  duration?: {
    label?: string;
  };

  difficulty?: string;
  region?: string;

  priceFromPEN?: number;
  coverImage?: string;

  
  isActive?: boolean;
  isFeatured?: boolean;

  includes?: string[];
  excludes?: string[];

  itinerary?: {
    title: string;
    desc?: string;
  }[];
}

const API_URL = import.meta.env.VITE_TOURS_API_URL;

export async function fetchTours(): Promise<Tour[]> {
  if (!API_URL) {
    throw new Error("VITE_TOURS_API_URL no está definida");
  }

  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Error al obtener tours");
  }

  const data = await res.json();
  return data.tours ?? [];
}
