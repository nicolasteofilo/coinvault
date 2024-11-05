import { env } from '@/config/env'

const BASE_URL = 'https://api.coingecko.com/api/v3'

async function fetchFromCoinGecko(
  endpoint: string,
  params: Record<string, string> = {},
) {
  const url = new URL(`${BASE_URL}/${endpoint}`)
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  )

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.COIN_GECKO_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error fetching data from CoinGecko: ${response.statusText}`,
      )
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getPing() {
  return await fetchFromCoinGecko('ping')
}

export async function getCoinMarketData(
  coinId?: string,
  vsCurrency: string = 'usd',
) {
  const params: Record<string, string> = {
    vs_currency: vsCurrency,
    per_page: '1',
  }
  if (coinId) {
    params.ids = coinId
  }
  return await fetchFromCoinGecko(`coins/markets`, params)
}
