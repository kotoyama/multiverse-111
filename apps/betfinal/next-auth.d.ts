import { DefaultSession, DefaultUser } from 'next-auth'

import { User as SharedUser } from '@repo/shared-types'

declare module 'next-auth' {
  interface User extends DefaultUser, SharedUser {}

  interface Session extends DefaultSession {
    user?: User
  }
}
