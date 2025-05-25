import { Amiri } from 'next/font/google'
import { getServerSession } from 'next-auth/next'

import { i18n } from '@repo/i18n/config'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { getLocale, getTranslations } from '@repo/i18n/server'
import '@repo/uikit/style.css'

import { authOptions } from './api/auth/[...nextauth]/route'
import {
  BootstrapAppProvider,
  SessionProvider,
  StoreProvider,
} from './providers'
import { settings } from './settings'
import { Header } from './ui/widgets/header'
import './ui/globals.css'

const amiri = Amiri({
  variable: '--font-amiri',
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  display: 'swap',
})

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title', { brand: settings.appName }),
    description: t('description', { brand: settings.appName }),
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const session = await getServerSession(authOptions)
  const preloadedState = {
    user: {
      currentUser: session?.user ?? null,
      isAuthenticated: Boolean(session),
    },
  }

  const locale = await getLocale()
  const dir = i18n.dirs[locale] ?? i18n.defaultDir

  return (
    <html lang={locale} dir={dir}>
      <body className={amiri.variable}>
        <NextIntlClientProvider locale={locale}>
          <SessionProvider session={session}>
            <StoreProvider preloadedState={preloadedState}>
              <BootstrapAppProvider />
              <Header brand={settings.appName} />
              {children}
            </StoreProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
