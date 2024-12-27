import { useRoute } from "vue-router";

export function useLocale(
  supportedLocales = ["en", "vi"],
  defaultLocale = "vi"  // Đảm bảo mặc định là "vi" nếu không truyền vào
) {
  const queryParamName = "lang";
  const route = useRoute();
  
  // trying to find one of the supported locales in the url
  const urlLocale = new URLSearchParams(window.location.search).get(queryParamName);
  const browserLocale = navigator.language;

  /**
   * Determines the locale
   * @returns {string} one of the supported locales
   */
  const getCurrent = () => {
    if (urlLocale && !supportedLocales.includes(urlLocale)) {
      console.warn(`Locale ${urlLocale} is not supported and will be ignored!`); // eslint-disable-line
    }

    // url locale is most important one
    if (urlLocale && supportedLocales.includes(urlLocale)) return urlLocale;

    // trying to find one of the supported locales in browser preferences
    const preferredLocale = supportedLocales.find((locale) =>
      browserLocale.includes(locale)
    );

    return preferredLocale || defaultLocale;  // Trả về defaultLocale nếu không có locale hợp lệ
  };

  /**
   * Returns full version of locale used for i18n
   * @param {string} locale current by default
   * @returns full version of locale
   */
  const getFull = (locale = getCurrent()) => {
    const fullLocales = {
      en: "en-US",
      vi: "vi-VN",
    };

    return fullLocales[locale];
  };

  /**
   * Returns current path with changed locale
   * @param {string} locale one of supported locales
   * @returns {string} new path
   */
  const getLinkToChange = (locale) => {
    if (!supportedLocales.includes(locale)) {
      throw new Error(
        `Locale ${locale} is not supported! Available are: ${supportedLocales.join(
          ", "
        )}`
      );
    }

    window.document.title =
      getCurrent() === "en"
        ? "Portfolio | Truong Nguyen Khanh"
        : "Portfolio | Trương Nguyễn Khánh";
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(queryParamName, locale);

    return `${window.location.origin}${route.path}?${queryParams.toString()}`;
  };

  /**
   * Changes the locale and reloads the page
   * @param {string} locale one of supported locales
   */
  const change = (locale) => {
    window.location.replace(getLinkToChange(locale));
  };

  return {
    getCurrent,
    getFull,
    getLinkToChange,
    change,
    queryParamName,
    list: supportedLocales,
  };
}
