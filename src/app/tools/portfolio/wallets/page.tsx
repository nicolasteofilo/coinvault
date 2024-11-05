import { PageWrapper } from '../../components/page-wrapper'

export default function Wallets() {
  return (
    <PageWrapper
      title='Portfólio -> Carteiras'
      paths={[
        { name: 'Portfolio', href: '/tools/portfolio' },
        { name: 'Carteiras', href: '/tools/portfolio/wallets' },
      ]}
    >
      <h1>Wallets</h1>
    </PageWrapper>
  )
}
