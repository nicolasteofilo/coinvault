'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'

export default function Auth() {
  return (
    <div className='flex h-full min-h-screen w-screen items-center justify-center'>
      <Tabs defaultValue='login' className='w-full max-w-lg'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Iniciar sessão</TabsTrigger>
          <TabsTrigger value='register'>Criar conta</TabsTrigger>
        </TabsList>

        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
