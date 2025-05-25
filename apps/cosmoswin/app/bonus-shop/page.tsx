import { getTranslations } from '@repo/i18n/server'
import { bonuses } from '@repo/data'
import type { Bonus } from '@repo/shared-types'

import { BonusesDisplay } from './bonuses-display'

async function getBonuses(): Promise<Bonus[]> {
  return bonuses
}

export default async function BonusShopPage() {
  const t = await getTranslations('bonusShop')
  const bonuses = await getBonuses()

  return (
    <main>
      <h1>{t('title')}</h1>
      <BonusesDisplay bonuses={bonuses} />
    </main>
  )
}
