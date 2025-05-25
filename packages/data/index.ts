import type { User, Bonus } from '@repo/shared-types'

import usersData from './user-mock-data.json'
import bonusesData from './bonuses-mock-data.json'

export const users = usersData as User[]
export const bonuses = bonusesData as Bonus[]
