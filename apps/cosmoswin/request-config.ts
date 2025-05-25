import { notFound } from 'next/navigation'

import { IntlErrorCode } from '@repo/i18n/client'
import { i18n } from '@repo/i18n/config'
import { getRequestConfig } from '@repo/i18n/server'
import { type Locale } from '@repo/i18n/types'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as Locale | undefined ?? i18n.defaultLocale

	if (!locale || !i18n.locales.includes(locale)) {
		notFound()
	}

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
