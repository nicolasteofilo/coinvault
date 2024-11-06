import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { PageWrapper } from '../components/page-wrapper'

export default async function Portfolio() {
  return (
    <PageWrapper
      title='Portfolio'
      paths={[{ name: 'Porfolio', href: '/tools/portfolio/' }]}
      actions={
        <Link href='/tools/portfolio/wallets'>
          <Button>Carteiras</Button>
        </Link>
      }
    >
      <div>Portfolio</div>
    </PageWrapper>
  )
}
