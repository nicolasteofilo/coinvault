'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useState } from 'react'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'

export default function Auth() {
  const [selectedTab, setSelectedTab] = useState<'login' | 'register'>('login')

  const handleTabChange = (tab: 'login' | 'register') => {
    setSelectedTab(tab)
  }

  return (
    <div className='flex h-full min-h-screen w-screen items-center justify-center'>
      <Tabs
        defaultValue='login'
        className='w-full max-w-lg'
        value={selectedTab}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login' onClick={() => handleTabChange('login')}>
            Iniciar sessão
          </TabsTrigger>
          <TabsTrigger
            value='register'
            onClick={() => handleTabChange('register')}
          >
            Criar conta
          </TabsTrigger>
        </TabsList>

        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm handleTabChange={handleTabChange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
