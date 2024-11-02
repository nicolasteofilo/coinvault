'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { GoogleIcon } from '@/assets/icons/google'
import { env } from '@/config/env'
import { useToast } from '@/hooks/use-toast'
import { signIn as signInGoogle } from '@/server/actions/auth/google'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SeparatorWithText } from '../components/separator-with-text'

interface IRegisterFormProps {
  handleTabChange: (tab: 'login' | 'register') => void
}

const registerFormSchema = z.object({
  name: z.string({ message: 'Nome é obrigatório' }).min(1, {
    message: 'Nome é obrigatório',
  }),
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'E-mail é obrigatório' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

export function RegisterForm({ handleTabChange }: IRegisterFormProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle()
    } catch (error) {
      toast({
        title: 'Erro ao logar!',
        description: 'Ocorreu um erro ao tentar logar com o Google.',
      })
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await fetch(`${env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/create`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você pode agora logar com a sua conta.',
      })
      handleTabChange('login')
    } else {
      toast({
        title: 'Erro ao criar conta!',
        description:
          'Ocorreu um erro ao criar sua conta. Tente novamente mais tarde.',
      })
    }
  })

  return (
    <Card>
      <CardHeader className='flex gap-3'>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription className='text-xs text-zinc-400'>
          Ao continuar, você concorda com a CoinVault Termos de serviço e
          reconhece que leu nossa Política de privacidade
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <form onSubmit={handleSubmit} className='mb-6 flex flex-col gap-4'>
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Insira seu nome'
                  className='w-full'
                  error={form.formState.errors.name?.message}
                  value={undefined}
                />
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Insira seu endereço de e-mail'
                  className='w-full'
                  error={form.formState.errors.email?.message}
                  value={undefined}
                />
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <Input
                  {...field}
                  className='w-full'
                  placeholder='Insira sua senha'
                  type='password'
                  error={form.formState.errors.password?.message}
                  value={undefined}
                />
              )}
            />
            <Button className='w-full font-medium text-white'>
              Criar conta
            </Button>
          </Form>
        </form>

        <SeparatorWithText text='ou' />
      </CardContent>
      <CardFooter className='w-full'>
        <Button
          variant='outline'
          className='w-full'
          onClick={handleGoogleLogin}
        >
          <GoogleIcon /> Continuar com o Google
        </Button>
      </CardFooter>
    </Card>
  )
}
