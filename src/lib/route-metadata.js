const routeMetadata = {
  "/": {
    title: "InfoEducație | Olimpiada de creație digitală",
    description:
      "InfoEducație este olimpiada națională de inovare și creație digitală " +
      "pentru elevii din România.",
  },
  "/acasa": {
    title: "InfoEducație | Olimpiada de creație digitală",
    description:
      "InfoEducație este olimpiada națională de inovare și creație digitală " +
      "pentru elevii din România.",
  },
  "/alumni": {
    title: "Alumni | InfoEducație",
    description:
      "Descoperă comunitatea de alumni InfoEducație și poveștile foștilor " +
      "participanți.",
  },
  "/despre": {
    title: "Despre concurs | InfoEducație",
    description:
      "Află cum se desfășoară InfoEducație, cine poate participa și care sunt " +
      "categoriile concursului.",
  },
  "/contacte": {
    title: "Contact | InfoEducație",
    description:
      "Ia legătura cu echipa InfoEducație pentru întrebări despre concurs, " +
      "participare și organizare.",
  },
  "/inregistrare": {
    title: "Creează un cont | InfoEducație",
    description:
      "Creează un cont InfoEducație pentru a participa la olimpiada de inovare " +
      "și creație digitală.",
  },
  "/inscriere": {
    title: "Înscriere în concurs | InfoEducație",
    description:
      "Înscrie un participant, profesor sau proiect în concursul InfoEducație.",
  },
  "/juriu": {
    title: "Juriu | InfoEducație",
    description:
      "Cunoaște membrii juriului și comisiile care evaluează proiectele " +
      "InfoEducație.",
  },
  "/participanti": {
    title: "Participanți | InfoEducație",
    description:
      "Explorează participanții și proiectele înscrise la edițiile " +
      "InfoEducație.",
  },
  "/poze": {
    title: "Fotografii | InfoEducație",
    description:
      "Răsfoiește albumele foto din taberele și edițiile InfoEducație.",
  },
  "/program": {
    title: "Program | InfoEducație",
    description:
      "Consultă programul activităților, prezentărilor și evaluărilor " +
      "InfoEducație.",
  },
  "/rezultate": {
    title: "Rezultate | InfoEducație",
    description:
      "Vezi rezultatele proiectelor și participanților din edițiile " +
      "InfoEducație.",
  },
  "/seminarii": {
    title: "Seminarii | InfoEducație",
    description:
      "Descoperă seminariile și invitații care împărtășesc experiență cu " +
      "participanții InfoEducație.",
  },
  "/home": {
    title: "InfoEducație | Digital creation competition",
    description:
      "InfoEducație is Romania's national innovation and digital creation " +
      "competition for high-school students.",
  },
  "/about": {
    title: "About the competition | InfoEducație",
    description:
      "Learn how InfoEducație works, who can participate, and which project " +
      "categories are available.",
  },
  "/contact": {
    title: "Contact | InfoEducație",
    description:
      "Contact the InfoEducație team with questions about the competition, " +
      "participation, or organization.",
  },
  "/photos": {
    title: "Photos | InfoEducație",
    description:
      "Browse photo albums from InfoEducație camps and past editions.",
  },
};

const notFoundMetadata = {
  title: "Pagina nu a fost găsită | InfoEducație",
  description:
    "Pagina căutată nu există. Revino la pagina principală InfoEducație sau " +
    "folosește navigația pentru a continua.",
};

export function getRouteMetadata(pathname) {
  if (pathname.startsWith("/robotica/")) {
    return {
      title: "Arena de robotică | InfoEducație",
      description:
        "Urmărește starea live și programul de testare din arena de robotică " +
        "InfoEducație.",
    };
  }

  return routeMetadata[pathname] || notFoundMetadata;
}
