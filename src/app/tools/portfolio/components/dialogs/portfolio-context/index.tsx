import { createContext, useState } from 'react'

interface PortfolioContextValue {
  isNewWalletDialogOpen: boolean
  handleOpenNewWalletDialog: () => void
  handleCloseNewWalletDialogOpen: () => void
}

export const PortfolioContext = createContext({} as PortfolioContextValue)

interface PortfolioProviderProps {
  children: React.ReactNode
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [isNewWalletDialogOpen, setIsNewWalletDialogOpen] = useState(false)

  function handleOpenNewWalletDialog() {
    setIsNewWalletDialogOpen(true)
  }

  function handleCloseNewWalletDialogOpen() {
    setIsNewWalletDialogOpen(false)
  }

  return (
    <PortfolioContext.Provider
      value={{
        isNewWalletDialogOpen,
        handleOpenNewWalletDialog,
        handleCloseNewWalletDialogOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}
