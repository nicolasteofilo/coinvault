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
import { useToast } from '@/hooks/use-toast'
import {
  hasAccountInGoogle,
  validateCredentials,
} from '@/server/actions/auth/credentials'
import { signIn as signInGoogle } from '@/server/actions/auth/google'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SeparatorWithText } from '../components/separator-with-text'

const loginFormSchema = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'E-mail é obrigatório' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

export function LoginForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    form.clearErrors()
    const haveAccountInGoogle = await hasAccountInGoogle(data.email)

    if (haveAccountInGoogle) {
      form.setError('root', {
        message: 'Este e-mail está vinculado a uma conta Google.',
      })
    } else {
      const isValidCredentials = await validateCredentials(
        data.email,
        data.password
      )

      if (!isValidCredentials) {
        form.setError('root', {
          message: 'E-mail ou senha inválidos.',
        })
      } else {
        try {
          await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirectTo: '/tools',
          })
        } catch (error) {
          toast({
            title: 'Erro ao logar!',
            description: 'Ocorreu um erro ao tentar logar.',
          })
        }
      }
    }
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

  return (
    <Card>
      <CardHeader className='flex gap-3'>
        <CardTitle>Iniciar sessão</CardTitle>
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
              name='email'
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Insira seu endereço de e-mail'
                  className='w-full'
                  error={form.formState.errors.email?.message}
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
                  type='text'
                  error={form.formState.errors.password?.message}
                />
              )}
            />
            {form.formState.errors.root?.message && (
              <p className='text-xs text-red-500'>
                {form.formState.errors.root?.message}
              </p>
            )}
            <Button className='w-full font-medium text-white' type='submit'>
              Entrar
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
