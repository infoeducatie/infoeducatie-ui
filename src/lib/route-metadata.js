import seoEn from "../translations/en/seo.json";
import seoRo from "../translations/ro/seo.json";
import { localizedPaths } from "./localized-routes";

const catalogs = { en: seoEn, ro: seoRo };
const routeEntries = Object.entries(localizedPaths);

function getRouteKey(pathname) {
  if (pathname.startsWith("/robotica/")) return "robotics";
  if (pathname.startsWith("/blog/")) return "blog";
  if (pathname === "/acasa") return "home";

  return routeEntries.find(([, path]) => path === pathname)?.[0];
}

export function getRouteMetadata(pathname, language = "ro") {
  const catalog = catalogs[language] || catalogs.ro;
  return catalog[getRouteKey(pathname)] || catalog.notFound;
}
