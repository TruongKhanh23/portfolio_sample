import { createI18n } from "vue-i18n";
import messages from "@/locale/index";
import { useLocale } from "@/composables/useLocale";

let i18nInstance = null;

export function getLocale() {
  // Lưu ý: bạn cần truyền tham số cho useLocale
  return useLocale().getFull();
}

export function pluralTranslate(key, ...args) {
  return key && i18nInstance.te(key) ? i18nInstance.tc(key, ...args) : key;
}

export function translate(key, data) {
  return key && i18nInstance.te(key) ? i18nInstance.t(key, data) : key;
}

export default function () {
  const localeLanguage = getLocale();

  i18nInstance = createI18n({
    legacy: false,
    locale: localeLanguage, // set locale
    fallbackLocale: "vi-VN",
    messages, // set locale messages
  });

  return i18nInstance;
}
