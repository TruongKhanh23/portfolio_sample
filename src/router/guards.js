import { useLocale } from "@/composables/useLocale"

const parseJsonData = (urlQuery) => {
  if (urlQuery?.response) {
    const formatPayload = urlQuery?.response?.replaceAll("'", "")

    return JSON.parse(formatPayload)
  }
  return ""
}

export function checkAuthGuard(to, from, next) {
  const { product } = parseJsonData(to?.query)

  if (product?.productCode) {
    const lang = useLocale().getCurrent()
    next({ name: "ViewProduct", params: { productId: product?.productCode, optionCode: product?.optionCode, locale: lang } })
  } else {
    next()
  }
}

/**
 * Helps to preserve locale in query params during the navigation
 */
export function preserveLocaleGuard(to, _, next) {
  const locale = useLocale()

  if (to.query && to.query.lang) {
    // if we have locale - do nothing
    next()
  } else {
    // if we do not have a locale - set locale & preserve query params
    next({
      ...to,
      query: {
        ...to.query,
        [locale.queryParamName]: locale.getCurrent(),
      },
    })
  }
}