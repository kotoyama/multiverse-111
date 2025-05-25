import { IntlErrorCode } from '@repo/i18n/client'
import { getRequestConfig } from '@repo/i18n/server'
import { getUserLocale } from '@repo/i18n/localeService'

export default getRequestConfig(async () => {
  const locale = await getUserLocale()

  return {
    onError(error) {
      console.error(error)
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.')

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`
      } else {
        return `Fix this message: ${path}`
      }
    },
    messages: {
      ...(await import(`@repo/i18n/locales/${locale}.json`)).default,
    },
    locale,
  }
})
