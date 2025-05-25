import { getTranslations } from '@repo/i18n/server'

import styles from './page.module.css'

export default async function HomePage() {
  const t = await getTranslations('homePage')

  return (
    <main>
      <h1 className={styles.title}>{t('title', { brand: 'Cosmoswin' })}</h1>
      <p>{t('subtitle')}</p>
    </main>
  )
}
