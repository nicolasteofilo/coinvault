import { getCoinMarketData } from '@/server/services/coin-gecko/api'
import { PageWrapper } from '../components/page-wrapper'

export default async function Portfolio() {
  const coinsMarketData = await getCoinMarketData()

  console.log(coinsMarketData)

  return (
    <PageWrapper title='Portfolio' path='/tools/portfolio'>
      <div>Portfolio</div>
    </PageWrapper>
  )
}
