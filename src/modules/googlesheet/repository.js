import { fetchAPI } from '@lib/api'

export async function getSheetData() {
  return await fetchAPI({
    path: '/sheet',
  })
}
