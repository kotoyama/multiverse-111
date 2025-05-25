'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

import { useTranslations } from '@repo/i18n/client'
import { Button } from '@repo/uikit/components'
import LanguageSwitcher from '@repo/i18n/language-switcher'

import { useAppSelector } from '../../../lib/hooks'
import styles from './header.module.css'
import { Link } from '../../../../routing'

type Props = {
  brand: string
}

export function Header({ brand }: Props) {
  const t = useTranslations('header')
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.user)

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">{brand}</Link>
      </div>
      <nav className={styles.navigation}>
        {isAuthenticated ? (
          <>
            <Link href="/deposit" className={styles.navLink}>
              {t('depositLink')}
            </Link>
            <Link href="/bonus-shop" className={styles.navLink}>
              {t('bonusShopLink')}
            </Link>
            <span className={styles.balanceDisplay}>
              {t('balanceDisplay', {
                amount: currentUser!.currentBalance.toFixed(2),
              })}
            </span>
            <Button variant="outlined" onClick={handleLogout}>
              {t('logoutButton')}
            </Button>
          </>
        ) : (
          <Link href="/login">{t('loginLink')}</Link>
        )}
        <LanguageSwitcher />
      </nav>
    </header>
  )
}
