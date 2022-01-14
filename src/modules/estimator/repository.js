import { fetchAPI } from '@lib/api'

export async function estimate({ origin, destination }) {
  return await fetchAPI({
    path: '/estimate',
    params: { origin, destination },
  })
}
