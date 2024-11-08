import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import localFont from 'next/font/local'
import './globals.css'

const interV4Regular = localFont({
  src: './fonts/inter-v4/Inter-Regular.woff2',
  variable: '--font-inter-v4',
})

export const metadata: Metadata = {
  title: 'CoinVault',
  description: 'CoinVault - Seu gerenciador de criptomoedas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${interV4Regular.className} dark antialiased`}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
