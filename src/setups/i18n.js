import { createI18n } from "vue-i18n";
import messages from "@/locale/index";
import { useLocale } from "@/composables/useLocale";

let i18nInstance = null;

export function getLocale() {
  // Lưu ý: bạn cần truyền tham số cho useLocale
  return useLocale().getFull();
}

export default function () {
  const localeLanguage = getLocale();

  i18nInstance = createI18n({
    legacy: false,
    locale: localeLanguage, // set locale
    fallbackLocale: "vi-VN",
    globalInjection: true,
    messages, // set locale messages
  });

  return i18nInstance;
}
