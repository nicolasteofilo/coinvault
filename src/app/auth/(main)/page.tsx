'use client'

import { safeExecuteFunction } from '@/app/utils/safeExecute'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { signIn } from '@/server/actions/auth/google'
import { RiGoogleFill } from '@remixicon/react'
import { useState } from 'react'

export default function Auth() {
  const [isLoadingGoogleLogin, setIsLoadingGoogleLogin] = useState(false)
  const { toast } = useToast()

  const onSuccessLoginWithGoogle = () => {
    setIsLoadingGoogleLogin(false)
    toast({
      title: 'Login realizado!',
      description: 'Autenticado com sucesso usando sua conta do Google.',
    })
  }

  const onErrorLoginWithGoogle = () => {
    setIsLoadingGoogleLogin(false)
    toast({
      title: 'Erro ao logar!',
      description: 'Ocorreu um erro ao tentar logar com o Google.',
    })
  }

  const handleGoogleLogin = () => {
    safeExecuteFunction(
      async () => await signIn(),
      onSuccessLoginWithGoogle,
      onErrorLoginWithGoogle
    )
  }

  return (
    <div className='flex h-full w-screen items-center justify-center'>
      <Button variant='outline' className='w-full' onClick={handleGoogleLogin}>
        {isLoadingGoogleLogin ? (
          <div className='spinner' />
        ) : (
          <>
            <RiGoogleFill
              className='me-3 text-gray-900 dark:text-white/60'
              size={16}
              aria-hidden='true'
            />
            Entrar com o Google
          </>
        )}
      </Button>
    </div>
  )
}
