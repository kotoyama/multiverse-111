'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

import {
  loginUser,
  logoutUser,
  setUserData,
  clearUserData,
} from '~/entities/user'

import { useAppDispatch, useAppSelector } from '../_store/hooks'

export function BootstrapAppProvider() {
  const { data, status } = useSession()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)

  React.useEffect(() => {
    if (status === 'loading') return
    if (status === 'authenticated' && data?.user) {
      dispatch(loginUser(data.user))
      setUserData(data.user)
    }
    if (status === 'unauthenticated') {
      dispatch(logoutUser())
      clearUserData()
    }
  }, [status, data, dispatch])

  React.useEffect(() => {
    if (currentUser) {
      setUserData(currentUser)
    }
  }, [currentUser])

  return null
}
