'use client'
import { PortfolioProvider } from './components/dialogs/portfolio-context'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortfolioProvider>{children}</PortfolioProvider>
}
