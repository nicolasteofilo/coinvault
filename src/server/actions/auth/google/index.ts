'use server'
import { signIn as signInAuth, signOut as signOutAuth } from '@auth'

export async function signIn() {
  return await signInAuth('google', { redirectTo: '/tools' })
}

export async function signOut() {
  return await signOutAuth({ redirect: true, redirectTo: '/' })
}
