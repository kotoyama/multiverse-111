'use client'

import React from 'react'
import { useLocale } from 'next-intl'

import { Button } from '@repo/uikit/components'

import { i18n } from './config'
import { type Locale } from './types'
import { setUserLocale } from './locale-service'
import styles from './language-switcher.module.css'

export default function LanguageSwitcher() {
  const currentLocale = useLocale()
  const [, startTransition] = React.useTransition()

  function onClick(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <div className={styles.container}>
      {i18n.locales.map((locale) => (
        <Button
          key={locale}
          className={styles.languageButton}
          aria-pressed={currentLocale === locale}
          onClick={() => onClick(locale)}
        >
          {locale}
        </Button>
      ))}
    </div>
  )
}
