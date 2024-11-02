'use server'

import { hashPassword } from '@/app/api/utils/hash-passord'
import { prisma } from '@/server/services/database/prisma'

export async function hasAccountInGoogle(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
    },
  })

  if (!user) return false

  const hasAccountInGoogle = await prisma.account.findFirst({
    where: {
      userId: user.id,
      provider: 'google',
    },
    select: {
      userId: true,
    },
  })

  if (hasAccountInGoogle) return true

  return false
}

export async function validateCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  })

  if (!user) {
    return false
  }

  const hashedPassword = hashPassword(password)

  if (user.password !== hashedPassword) {
    return false
  }

  return true
}

export async function isEmailInUse(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  return user !== null
}
