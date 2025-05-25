import type { Brand, Bonus, User } from '@repo/shared-types'

export interface BonusFilterCriteria {
  brand: Brand
  user: User
}

export function filterBonuses(
  bonuses: Bonus[],
  criteria: BonusFilterCriteria,
): Bonus[] {
  const { brand, user } = criteria

  return bonuses.filter((bonus) => {
    if (bonus.brand !== brand) {
      return false
    }

    if (bonus.requiresKYC && !user.isKYCApproved) {
      return false
    }

    if (
      bonus.depositCountMin !== undefined &&
      user.depositCount < bonus.depositCountMin
    ) {
      return false
    }

    if (
      bonus.depositCountMax !== undefined &&
      user.depositCount > bonus.depositCountMax
    ) {
      return false
    }

    if (bonus.balanceMustBeZero && user.currentBalance !== 0) {
      return false
    }

    if (bonus.registrationWithinLastDays !== undefined) {
      const regDate = new Date(user.registrationDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - regDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > bonus.registrationWithinLastDays) {
        return false
      }
    }

    if (bonus.availableCountries && bonus.availableCountries.length > 0) {
      if (!bonus.availableCountries.includes(user.country)) {
        return false
      }
    }

    return true
  })
}
