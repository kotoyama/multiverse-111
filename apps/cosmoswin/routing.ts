import { i18n } from '@repo/i18n/config'
import {
	type BasePathNames,
	createNavigation,
	defineRouting,
} from '@repo/i18n/routing'
import { type Locale } from '@repo/i18n/types'

export const basePathNames = {
	'/': '/',
	'/bonus-shop': '/bonus-shop',
	'/deposit': '/deposit',
	'/login': '/login',
} satisfies BasePathNames<typeof i18n.locales>

export const pathnames = {
	...basePathNames,
} satisfies BasePathNames<typeof i18n.locales>

export const routing = defineRouting({
	locales: i18n.locales,
	defaultLocale: i18n.defaultLocale,
	localePrefix: 'as-needed',
	pathnames,
})

export type Pathnames = keyof typeof routing.pathnames

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing)

export function getPathnames(pathname: Pathnames, locales: Locale[]) {
	return Object.fromEntries(
		locales.map((locale) => [locale, getPathname({ locale, href: pathname })]),
	)
}
