export const supportedLanguages = [
  {
    code: 'en',
    default: true,
  },
  {
    code: 'ar',
    default: false,
  },
] as const

export const languageDirs: Record<(typeof supportedLanguages)[number]['code'], 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
} as const

export const i18n = {
  dirs: languageDirs,
  locales: supportedLanguages.map((l) => l.code),
  defaultLocale: supportedLanguages.find((l) => l.default)?.code ?? 'en',
  defaultDir: 'ltr',
} as const
