import type { Metadata } from 'next'

import LoginForm from './login-form'

export const metadata: Metadata = {
  title: 'Cosmoswin - Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}
