'use server'

import { cookies } from 'next/headers'

import { i18n } from './config'
import { type Locale } from './types'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || i18n.defaultLocale
}

export async function setUserLocale(locale: Locale) {
  ;(await cookies()).set(COOKIE_NAME, locale)
}
