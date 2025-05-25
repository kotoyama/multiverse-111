import { getServerSession } from 'next-auth/next'

import { getTranslations } from '@repo/i18n/server'
import { bonuses } from '@repo/data'
import { Alert } from '@repo/uikit/components'
import type { Bonus, User } from '@repo/shared-types'
import { filterBonuses, type BonusFilterCriteria } from '@repo/libs'

import { appName } from '../app-name'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { BonusesList } from './bonuses-list'
import styles from './page.module.css'

async function getBonuses(
  bonusFilterCriteria: BonusFilterCriteria
): Promise<Bonus[]> {
  const { brand, user } = bonusFilterCriteria
  return filterBonuses(bonuses, { brand, user })
}

export default async function BonusShopPage() {
  const t = await getTranslations('bonusShop')
  const session = await getServerSession(authOptions)

  const currentUser = session?.user as User
  const isAuthenticated = Boolean(session)

  const bonusFilterCriteria = {
    brand: appName.toLowerCase(),
    user: currentUser,
  } as BonusFilterCriteria

  const filteredBonuses = await getBonuses(bonusFilterCriteria)

  return (
    <main>
      <h1>{t('title')}</h1>

      {isAuthenticated && !currentUser.isKYCApproved && (
        <Alert type="error" className={styles.alert}>
          {t('kycNotApprovedMessage')}
        </Alert>
      )}

      {filteredBonuses.length > 0 ? (
        <BonusesList items={filteredBonuses} />
      ) : (
        <p className={styles.noBonuses}>{t('noBonusesAvailable')}</p>
      )}
    </main>
  )
}
