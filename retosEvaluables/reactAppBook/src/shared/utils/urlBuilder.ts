export default function URLBuilder(base:string, params:Record<string, string | number | undefined> ):string {
    const query = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

    return query ? `${base}?${query}` : base;
}