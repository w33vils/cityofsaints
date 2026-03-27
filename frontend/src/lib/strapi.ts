const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function fetchAPI<T>(path: string, params?: Record<string, string>): Promise<{ data: T; meta?: any }> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`);
  return res.json();
}

export const getSermons = () => fetchAPI<any[]>("/sermons", { populate: "*", "sort": "date:desc" });
export const getSermonSeries = () => fetchAPI<any[]>("/sermon-serieses", { populate: "*" });
export const getCurrentSeries = async () => {
  const res = await fetchAPI<any[]>("/sermon-serieses", { "filters[is_current][$eq]": "true", populate: "*" });
  return res.data?.[0] ?? null;
};
export const getEvents = () => fetchAPI<any[]>("/events", { populate: "*", "sort": "date:asc", "filters[date][$gte]": new Date().toISOString().split("T")[0] });
export const getLocations = () => fetchAPI<any[]>("/locations", { populate: "*" });
export const getTeamMembers = () => fetchAPI<any[]>("/team-members", { populate: "*" });
export const getMinistries = () => fetchAPI<any[]>("/ministries", { populate: "*" });
export const getArticles = () => fetchAPI<any[]>("/articles", { populate: "*", "sort": "date:desc" });
export const getClasses = () => fetchAPI<any[]>("/classes", { populate: "*" });
export const getHomePage = () => fetchAPI<any>("/home-page", { populate: "*" });
export const getGivePage = () => fetchAPI<any>("/give-page", { "populate[primary_methods][populate]": "*", "populate[other_methods][populate]": "*", "populate[faqs][populate]": "*" });
export const getSiteSettings = () => fetchAPI<any>("/site-setting", { populate: "*" });
