export async function geocodeAddress(
  address: string,
  city: string,
  state: string,
  country: string
): Promise<{ latitude: number; longitude: number } | null> {
  const query = encodeURIComponent(`${address}, ${city}, ${state}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "VibeCheque/1.0 (venue-discovery-app)" },
    });
    const data = await res.json();
    if (!data.length) return null;
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
}
