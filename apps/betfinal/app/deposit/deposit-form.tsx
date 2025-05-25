'use client'

import React from 'react'

import { useTranslations } from '@repo/i18n/client'
import { Card, FormInput, Button, Alert } from '@repo/uikit/components'

import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { updateBalance } from '../lib/features/user/userSlice'
import styles from './page.module.css'

export function DepositForm() {
  const t = useTranslations('depositForm')
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)

  const [formData, setFormData] = React.useState({
    amount: '',
    meta: {
      errorMessage: '',
      successMessage: '',
      isLoading: false,
    },
  })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, amount: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) return

    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        isLoading: true,
        errorMessage: '',
        successMessage: '',
      },
    }))

    const depositAmount = Number(formData.amount)

    if (isNaN(depositAmount) || depositAmount <= 0) {
      setFormData((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          isLoading: false,
          successMessage: '',
          errorMessage: t('error.invalidAmount'),
        },
      }))
      return
    }

    dispatch(updateBalance(depositAmount))
    setFormData((prev) => ({
      ...prev,
      amount: '',
      meta: {
        ...prev.meta,
        isLoading: false,
        errorMessage: '',
        successMessage: t('success.depositSuccessful', {
          amount: depositAmount,
          newBalance: depositAmount + currentUser.currentBalance,
          depositCount: currentUser.depositCount + 1,
        }),
      },
    }))
  }

  return (
    <Card className={styles.container}>
      <h1>{t('title')}</h1>
      <form onSubmit={handleSubmit} className={styles.depositForm}>
        <FormInput
          id="amount"
          type="number"
          label={t('amountLabel', { currency: 'USD' })}
          value={formData.amount}
          onChange={handleAmountChange}
          min={0}
          required
        />

        {formData.meta.errorMessage && (
          <Alert type="error">{formData.meta.errorMessage}</Alert>
        )}
        {formData.meta.successMessage && (
          <Alert type="success">{formData.meta.successMessage}</Alert>
        )}

        <Button type="submit" disabled={formData.meta.isLoading}>
          {t('depositButton')}
        </Button>
      </form>
    </Card>
  )
}
