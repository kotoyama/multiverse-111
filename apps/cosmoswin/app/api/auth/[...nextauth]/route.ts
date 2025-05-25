import NextAuth, { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { users } from '@repo/data'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        if (!username || !password) {
          throw new Error('Missing credentials')
        }

        if (!password.trim()) {
          throw new Error('Password cannot be empty')
        }

        const foundUser = users.find((u) => u.username === username)

        if (!foundUser) {
          throw new Error('User not found')
        }

        return { ...foundUser, id: foundUser.username }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.currentBalance = token.currentBalance as number
        session.user.isKYCApproved = token.isKYCApproved as boolean
        session.user.depositCount = token.depositCount as number
        session.user.registrationDate = token.registrationDate as string
        session.user.country = token.country as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
