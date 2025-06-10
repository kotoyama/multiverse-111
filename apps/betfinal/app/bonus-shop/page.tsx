import { redirect } from 'next/navigation'

import { getTranslations } from '@repo/i18n/server'
import { bonuses } from '@repo/data'
import { Alert } from '@repo/uikit/components'
import type { Bonus, User } from '@repo/shared-types'
import { filterBonuses, BonusFilterCriteria } from '@repo/libs'

import { getUserData } from '~/entities/user'
import { BonusesList } from '~/features/bonus-shop/ui/BonusesDisplay'
import { settings } from '~/shared/settings'

import styles from './page.module.css'

async function getBonuses(user: User): Promise<Bonus[]> {
  return filterBonuses(bonuses, {
    user,
    brand: settings.appName.toLowerCase(),
  } as BonusFilterCriteria)
}

export default async function BonusShopPage() {
  const userData = await getUserData()
  const user = userData ? JSON.parse(userData) : null

  if (!user) {
    redirect('/login')
  }

  const bonuses = await getBonuses(user)
  const t = await getTranslations('bonusShop')

  return (
    <main>
      <h1>{t('title')}</h1>
      {!user?.isKYCApproved && settings.KYCRequired && (
        <Alert type="error" className={styles.alert}>
          {t('kycNotApprovedMessage')}
        </Alert>
      )}
      {bonuses.length > 0 ? (
        <BonusesList items={bonuses} />
      ) : (
        <p className={styles.noBonuses}>{t('noBonusesAvailable')}</p>
      )}
    </main>
  )
}
