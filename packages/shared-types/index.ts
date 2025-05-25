import { type Locale } from '@repo/i18n/types'

export type LocalizedText = {
  [key in Locale]: string
}

export interface User {
  username: string
  depositCount: number
  registrationDate: string
  country: string
  isKYCApproved: boolean
  currentBalance: number
}

export type Brand = 'cosmoswin' | 'betfinal'

export interface Bonus {
  brand: Brand
  id: string
  name: LocalizedText
  description: LocalizedText
  requiresKYC: boolean
  depositCountMin?: number
  depositCountMax?: number
  balanceMustBeZero?: boolean
  registrationWithinLastDays?: number
  availableCountries?: string[]
}
