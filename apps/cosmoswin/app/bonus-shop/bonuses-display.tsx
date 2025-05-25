'use client'

import { Alert } from '@repo/uikit/components'
import { useTranslations } from '@repo/i18n/client'
import { BonusFilterCriteria, filterBonuses } from '@repo/libs'
import type { Bonus } from '@repo/shared-types'

import { useAppSelector } from '../lib/hooks'
import { settings } from '../settings'
import styles from './page.module.css'
import { BonusesList } from './bonuses-list'

type Props = {
  bonuses: Bonus[]
}

export function BonusesDisplay({ bonuses }: Props) {
  const t = useTranslations('bonusShop')
  const { currentUser } = useAppSelector((state) => state.user)

  const bonusFilterCriteria = {
    user: currentUser,
    brand: settings.appName.toLowerCase(),
  } as BonusFilterCriteria

  const filteredBonuses = filterBonuses(bonuses, bonusFilterCriteria)

  return (
    <>
      {!currentUser?.isKYCApproved && settings.KYCRequired && (
        <Alert type="error" className={styles.alert}>
          {t('kycNotApprovedMessage')}
        </Alert>
      )}

      {filteredBonuses.length > 0 ? (
        <BonusesList items={filteredBonuses} />
      ) : (
        <p className={styles.noBonuses}>{t('noBonusesAvailable')}</p>
      )}
    </>
  )
}
