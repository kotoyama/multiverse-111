'use client'

import React from 'react'

import { useTranslations } from '@repo/i18n/client'
import { Button } from '@repo/uikit/components'

import styles from './page.module.css'

export const ClaimButton = React.memo(() => {
  const t = useTranslations('bonusShop')
  const [isClaimed, setIsClaimed] = React.useState(false)

  const handleClaim = React.useCallback(async () => {
    if (isClaimed) return
    setIsClaimed(true)
  }, [isClaimed])

  return (
    <Button
      className={styles.claimButton}
      disabled={isClaimed}
      onClick={handleClaim}
    >
      {t(isClaimed ? 'claimedButton' : 'claimButton')}
    </Button>
  )
})

ClaimButton.displayName = 'ClaimButton'
