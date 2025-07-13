import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import ar from "./ar.json";
import en from "./en.json";
import fr from "./fr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
};

// detect device language
const locales = RNLocalize.getLocales();
const deviceLanguage = locales?.[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
