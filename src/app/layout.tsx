import type { Metadata } from 'next'
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
      <body className={`${interV4Regular.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
