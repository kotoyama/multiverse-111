export const supportedLanguages = [
	{
		code: 'en',
    label: 'English',
    dir: 'ltr',
		default: true,
	},
	{
		code: 'ar',
		label: 'العربية',
    dir: 'rtl',
		default: false,
	},
] as const

export const i18n = {
	locales: supportedLanguages.map((l) => l.code),
	defaultLocale: supportedLanguages.find((l) => l.default)?.code ?? 'en',
} as const
