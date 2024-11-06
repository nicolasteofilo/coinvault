import { useContext } from 'react'
import { PortfolioContext } from '.'

export function usePortfolio() {
  return useContext(PortfolioContext)
}
