'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { signIn } from '@/server/actions/auth/google'
import { RiGoogleFill } from '@remixicon/react'

export default function Auth() {
  const { toast } = useToast()

  const handleGoogleLogin = async () => {
    try {
      await signIn()
    } catch (error) {
      toast({
        title: 'Erro ao logar!',
        description: 'Ocorreu um erro ao tentar logar com o Google.',
      })
    }
  }

  return (
    <div className='flex h-full w-screen items-center justify-center'>
      <Button variant='outline' className='w-full' onClick={handleGoogleLogin}>
        <RiGoogleFill
          className='me-3 text-gray-900 dark:text-white/60'
          size={16}
          aria-hidden='true'
        />
        Entrar com o Google
      </Button>
    </div>
  )
}
