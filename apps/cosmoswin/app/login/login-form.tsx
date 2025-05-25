'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useTranslations } from '@repo/i18n/client'
import { Card, FormInput, Button, Alert } from '@repo/uikit/components'

import { settings } from '../settings'
import styles from './page.module.css'

export default function LoginForm() {
  const t = useTranslations('loginForm')
  const router = useRouter()

  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    meta: {
      errorMessage: '',
      isLoading: false,
    },
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormData((prev) => ({
      ...prev,
      meta: { ...prev.meta, errorMessage: '', isLoading: true },
    }))

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: formData.username,
        password: formData.password,
      })

      if (result?.ok) {
        router.push('/')
      } else {
        setFormData((prev) => ({
          ...prev,
          meta: {
            isLoading: false,
            errorMessage: t('error.invalidCredentials'),
          },
        }))
      }
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        meta: { ...prev.meta, errorMessage: t('error.serverError') },
      }))
    }
  }

  return (
    <Card className={styles.container}>
      <h1>{t('title', { brand: settings.appName })}</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <FormInput
          id="username"
          label={t('usernameLabel')}
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          disabled={formData.meta.isLoading}
          required
        />
        <FormInput
          id="password"
          label={t('passwordLabel')}
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          disabled={formData.meta.isLoading}
          required
        />

        {formData.meta.errorMessage && (
          <Alert type="error">{formData.meta.errorMessage}</Alert>
        )}

        <Button type="submit" disabled={formData.meta.isLoading}>
          {t('loginButton')}
        </Button>
      </form>
    </Card>
  )
}
