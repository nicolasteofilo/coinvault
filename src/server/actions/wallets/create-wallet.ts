'use server'
import { auth } from '@auth'

interface CreateWalletParams {
  name?: string
}

export async function createWallet({ name }: CreateWalletParams) {
  try {
    const session = await auth()
    console.log(name)
    console.log(session?.user?.id)
  } catch (error) {
    console.log(error)
  }
}
