'use client'

import React from 'react'
import { Provider } from 'react-redux'

import type { User } from '@repo/shared-types'

import { makeStore, AppStore } from '../lib/store'

interface StoreProviderProps {
  children: React.ReactNode
  preloadedState?: {
    user: {
      currentUser: User | null
      isAuthenticated: boolean
    }
  }
}

export function StoreProvider({
  children,
  preloadedState,
}: StoreProviderProps) {
  const storeRef = React.useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
