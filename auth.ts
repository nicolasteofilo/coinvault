import { env } from '@/config/env'
import { prisma } from '@/server/services/database/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { encode as encondeNextAuth } from 'next-auth/jwt'
import { cookies } from 'next/headers'

import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Passkey from 'next-auth/providers/passkey'
import { v4 as uuidv4 } from 'uuid'

const adapter = PrismaAdapter(prisma)

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
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        }

        const res = await fetch(
          `${env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/auth`,
          {
            method: 'POST',
            body: JSON.stringify(userCredentials),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        const user = await res.json()

        if (res.ok && user) {
          return user as User
        } else {
          return null
        }
      },
    }),
    Passkey,
  ],
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuidv4()

        if (!params.token.sub) {
          throw new Error('No user ID found in token')
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        if (!createdSession) {
          throw new Error('Failed to create session')
        }

        const cookieStore = await cookies()
        cookieStore.set('authjs.session-token', sessionToken)

        return sessionToken
      }

      return encondeNextAuth(params)
    },
  },
  adapter,
  callbacks: {
    async jwt({ token, account }) {
      console.log({ account })
      if (account?.provider === 'credentials') {
        token.credentials = true
      }
      return token
    },
  },
  secret: env.AUTH_SECRET!,
  experimental: { enableWebAuthn: true },
})
