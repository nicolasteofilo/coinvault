import { env } from '@/config/env'
import { prisma } from '@/server/services/database/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    newUser: '/tools',
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
})
