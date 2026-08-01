import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import aboutEn from "../translations/en/about.json";
import commonEn from "../translations/en/common.json";
import contactEn from "../translations/en/contact.json";
import formsEn from "../translations/en/forms.json";
import homeEn from "../translations/en/home.json";
import notFoundEn from "../translations/en/not-found.json";
import photosEn from "../translations/en/photos.json";
import publicEn from "../translations/en/public.json";
import registrationEn from "../translations/en/registration.json";
import roboticsEn from "../translations/en/robotics.json";
import aboutRo from "../translations/ro/about.json";
import commonRo from "../translations/ro/common.json";
import contactRo from "../translations/ro/contact.json";
import formsRo from "../translations/ro/forms.json";
import homeRo from "../translations/ro/home.json";
import notFoundRo from "../translations/ro/not-found.json";
import photosRo from "../translations/ro/photos.json";
import publicRo from "../translations/ro/public.json";
import registrationRo from "../translations/ro/registration.json";
import roboticsRo from "../translations/ro/robotics.json";

export const supportedLanguages = ["ro", "en"];
export const LANGUAGE_STORAGE_KEY = "infoeducatie.language";

function getInitialLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.includes(storedLanguage) ? storedLanguage : "ro";
  } catch {
    return "ro";
  }
}

export function persistLanguage(language) {
  if (!supportedLanguages.includes(language)) return;

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Translation switching still works when storage is unavailable.
  }
}

const resources = {
  en: {
    about: aboutEn,
    common: commonEn,
    contact: contactEn,
    forms: formsEn,
    home: homeEn,
    notFound: notFoundEn,
    photos: photosEn,
    public: publicEn,
    registration: registrationEn,
    robotics: roboticsEn,
  },
  ro: {
    about: aboutRo,
    common: commonRo,
    contact: contactRo,
    forms: formsRo,
    home: homeRo,
    notFound: notFoundRo,
    photos: photosRo,
    public: publicRo,
    registration: registrationRo,
    robotics: roboticsRo,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: "common",
  fallbackLng: "ro",
  interpolation: {
    escapeValue: false,
  },
  lng: getInitialLanguage(),
  ns: [
    "common",
    "home",
    "about",
    "contact",
    "forms",
    "photos",
    "public",
    "registration",
    "robotics",
    "notFound",
  ],
  resources,
  supportedLngs: supportedLanguages,
});

export default i18n;
