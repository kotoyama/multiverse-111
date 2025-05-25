'use client'

import { SessionProvider as SessionProviderNextAuth } from 'next-auth/react'
import type { Session } from 'next-auth'

interface SessionProviderProps {
  children: React.ReactNode
  session?: Session | null
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <SessionProviderNextAuth session={session}>
      {children}
    </SessionProviderNextAuth>
  )
}
