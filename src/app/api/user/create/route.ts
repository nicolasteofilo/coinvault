import { Prisma } from '@prisma/client'

import { prisma } from '@/server/services/database/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { hashPassword } from '../../utils/hash-passord'

interface ICreateUserBody {
  name: string
  email: string
  password: string
}

const createUserSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export async function POST(request: NextRequest) {
  return await createUserHandler(request)
}

async function createUserHandler(request: NextRequest) {
  const { name, email, password } = (await request.json()) as ICreateUserBody

  const parsed = createUserSchema.safeParse({
    name,
    email,
    password,
  })

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.errors }, { status: 400 })
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword(password) },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json({ message: e.message }, { status: 400 })
      }
      return NextResponse.json({ message: e.message }, { status: 400 })
    }
  }
}
