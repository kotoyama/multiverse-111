'use client'

import type { Bonus } from '@repo/shared-types'
import { getLocalizedValue, useLocale } from '@repo/i18n/client'
import { Card } from '@repo/uikit/components'

import { ClaimButton } from './claim-button'
import styles from './page.module.css'

interface BonusesListProps {
  items: Bonus[]
}

export function BonusesList({ items }: BonusesListProps) {
  const currentLocale = useLocale()

  return (
    <div className={styles.bonusGrid}>
      {items.map((bonus) => (
        <Card key={bonus.id} className={styles.bonusCard}>
          <div className={styles.bonusContent}>
            <h2>{getLocalizedValue(bonus.name, currentLocale)}</h2>
            <p>{getLocalizedValue(bonus.description, currentLocale)}</p>
          </div>
          <ClaimButton />
        </Card>
      ))}
    </div>
  )
}
