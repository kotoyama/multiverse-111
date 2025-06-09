'use client'

import { SessionProvider, type SessionProviderProps } from './session-provider'
import { StoreProvider, type StoreProviderProps } from './store-provider'
import { BootstrapAppProvider } from './bootstrap-app-provider'

interface AppProviderProps extends SessionProviderProps, StoreProviderProps {
  children: React.ReactNode
}

export function AppProvider(props: AppProviderProps) {
  const { session, preloadedState, children } = props

  return (
    <SessionProvider session={session}>
      <StoreProvider preloadedState={preloadedState}>
        <BootstrapAppProvider />
        {children}
      </StoreProvider>
    </SessionProvider>
  )
}
