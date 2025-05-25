import type { Metadata } from 'next'

import { DepositForm } from './deposit-form'

export const metadata: Metadata = {
  title: 'Cosmoswin - Deposit',
  description: 'Make a deposit',
}

export default function DepositPage() {
  return (
    <main>
      <DepositForm />
    </main>
  )
}
