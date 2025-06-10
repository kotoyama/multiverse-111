'use server'

import { cookies } from 'next/headers'

import { i18n } from './config'
import { type Locale } from './types'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || i18n.defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
