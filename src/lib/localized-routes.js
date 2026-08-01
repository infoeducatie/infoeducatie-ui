export const localizedPaths = {
  about: "/despre",
  alumni: "/alumni",
  blog: "/blog",
  contact: "/contacte",
  contestEntry: "/inscriere",
  home: "/",
  jury: "/juriu",
  participants: "/participanti",
  photos: "/poze",
  register: "/inregistrare",
  results: "/rezultate",
  schedule: "/program",
  talks: "/seminarii",
};

export function getLocalizedPath(route) {
  return localizedPaths[route] || localizedPaths.home;
}
