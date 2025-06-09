'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

import { loginUser, logoutUser } from '~/entities/user'

import { useAppDispatch } from '../_store/hooks'

export function BootstrapAppProvider() {
  const { data, status } = useSession()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (status === 'loading') return
    if (status === 'authenticated' && data?.user) {
      dispatch(loginUser(data.user))
    }
    if (status === 'unauthenticated') {
      dispatch(logoutUser())
    }
  }, [status, data, dispatch])

  return null
}
