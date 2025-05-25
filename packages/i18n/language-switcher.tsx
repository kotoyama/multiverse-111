'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

import { i18n } from './config'
import styles from './language-switcher.module.css'

export default function LanguageSwitcher() {
  const currentLocale = useLocale()

  return (
    <div className={styles.container}>
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}`}
          hrefLang={locale}
          className={styles.languageButton}
          data-selected={currentLocale === locale}
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}
