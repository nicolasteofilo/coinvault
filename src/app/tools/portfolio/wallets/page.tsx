'use client'
import { PageWrapper } from '../../components/page-wrapper'
import { NewWalletDialog } from '../components/dialogs/new-wallet-dialog'

export default function Wallets() {
  return (
    <PageWrapper
      title='Portfólio -> Carteiras'
      paths={[
        { name: 'Portfolio', href: '/tools/portfolio' },
        { name: 'Carteiras', href: '/tools/portfolio/wallets' },
      ]}
      actions={<NewWalletDialog />}
    >
      <h1>Wallets</h1>
    </PageWrapper>
  )
}
