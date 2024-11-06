'use server'
import { prisma } from '@/server/services/database/prisma'
import { auth } from '@auth'

interface CreateWalletParams {
  name: string
}

export async function createWallet({ name }: CreateWalletParams) {
  try {
    const session = await auth()
    const userId = String(session?.user?.id)

    await prisma.wallet.create({
      data: {
        name,
        userId,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
