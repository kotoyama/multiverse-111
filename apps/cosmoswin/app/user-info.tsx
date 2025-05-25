'use client'

import { useTranslations } from '@repo/i18n/client'

import { settings } from './settings'
import { useAppSelector } from './lib/hooks'
import styles from './page.module.css'

export function UserInfo() {
  const t = useTranslations('homePage')
  const { currentUser } = useAppSelector((state) => state.user)

  return (
    <main>
      <h1 className={styles.title}>
        {t('title', {
          brand: settings.appName,
          username: currentUser!.username,
        })}
      </h1>
      <p>{t('subtitle')}</p>
      <div className={styles.userInfo}>
        <p>
          {t('userFields.currentBalance', {
            amount: currentUser!.currentBalance.toFixed(2),
          })}
        </p>
        <p>
          {t('userFields.depositCount', { count: currentUser!.depositCount })}
        </p>
        <p>
          {t('userFields.isKYCApproved', {
            approved: currentUser!.isKYCApproved
              ? t('options.yes')
              : t('options.no'),
          })}
        </p>
        <p>
          {t('userFields.registrationDate', {
            date: currentUser!.registrationDate,
          })}
        </p>
        <p>{t('userFields.country', { country: currentUser!.country })}</p>
      </div>
    </main>
  )
}
