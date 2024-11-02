import { env } from '@/config/env'
import { prisma } from '@/server/services/database/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
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
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
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
          }
        )

        const user = await res.json()

        if (res.ok && user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  adapter: PrismaAdapter(prisma),
  events: {
    signIn: async ({ user }) => {
      console.log(user)
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session = token.user as any
      return session
    },
  },
})
