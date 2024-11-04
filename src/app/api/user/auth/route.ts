import { prisma } from '@/server/services/database/prisma'
import { NextRequest, NextResponse } from 'next/server'

import { User } from '@prisma/client'
import { hashPassword } from '../../utils/hash-passord'

interface ILoginUserBody {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  return await loginUserHandler(request)
}

async function loginUserHandler(req: NextRequest) {
  const { email, password } = (await req.json()) as ILoginUserBody

  if (!email || !password) {
    return NextResponse.json({ message: 'Invalid inputs' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true,
      },
    })

    const hashedPassword = hashPassword(password)

    if (user && user.password === hashedPassword) {
      return NextResponse.json(
        exclude(user, ['password', 'emailVerified', 'createdAt', 'updatedAt']),
        { status: 200 },
      )
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

function exclude(user: Partial<User>, keys: (keyof User)[]) {
  for (const key of keys) {
    delete user[key]
  }
  return user
}
