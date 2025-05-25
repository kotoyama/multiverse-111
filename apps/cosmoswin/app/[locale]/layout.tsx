import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { getServerSession } from 'next-auth/next'

import { i18n } from '@repo/i18n/config'
import { NextIntlClientProvider } from '@repo/i18n/client'
import { getMessages, setRequestLocale } from '@repo/i18n/server'
import { type WithLocale } from '@repo/i18n/types'
import '@repo/uikit/style.css'

import { authOptions } from '../api/auth/[...nextauth]/route'
import {
  BootstrapAppProvider,
  SessionProvider,
  StoreProvider,
} from '../providers'
import { Header } from '../ui/widgets/header'
import '../ui/globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cosmoswin',
  description: 'Welcome to Cosmoswin!',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<WithLocale>
}) {
  const params = await props.params
  const { children } = props

  const session = await getServerSession(authOptions)
  const preloadedState = {
    user: {
      currentUser: session?.user ?? null,
      isAuthenticated: Boolean(session),
    },
  }

  setRequestLocale(params.locale)

  const messages = await getMessages()

  return (
    <html lang={params.locale}>
      <body className={poppins.variable}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <SessionProvider session={session}>
            <StoreProvider preloadedState={preloadedState}>
              <BootstrapAppProvider />
              <Header brand="Cosmoswin" />
              {children}
            </StoreProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
