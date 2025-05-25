import { useLocale as useUntypedLocale } from 'next-intl'
export * from 'next-intl'

import type { LocalizedText } from '@repo/shared-types'

import { type Locale } from './types'

export function useLocale() {
	return useUntypedLocale() as Locale
}

export const getLocalizedValue = (value: LocalizedText, locale: Locale) => {
  return value[locale]
}
