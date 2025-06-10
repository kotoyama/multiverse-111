'use server'

import { cookies } from 'next/headers'

import { User } from '@repo/shared-types'

const COOKIE_NAME = 'user-data'

export async function getUserData() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || null
}

export async function setUserData(userData: User) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, JSON.stringify(userData), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function clearUserData() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
