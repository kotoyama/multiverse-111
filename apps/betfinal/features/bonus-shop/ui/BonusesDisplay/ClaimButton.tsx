'use client'

import React from 'react'

import { useTranslations } from '@repo/i18n/client'
import { Button } from '@repo/uikit/components'

import styles from './BonusesList.module.css'

export const ClaimButton = () => {
  const t = useTranslations('bonusShop')
  const [isClaimed, setIsClaimed] = React.useState(false)

  const handleClaim = () => {
    if (isClaimed) return
    setIsClaimed(true)
  }

  return (
    <Button
      className={styles.claimButton}
      disabled={isClaimed}
      onClick={handleClaim}
    >
      {t(isClaimed ? 'claimedButton' : 'claimButton')}
    </Button>
  )
}
