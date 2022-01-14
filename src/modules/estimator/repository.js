import { fetchAPI } from '@lib/api'

export function estimate({ q, start, limit }) {
  return fetchAPI({
    path: '/articles',
    params: { q, _start: start, _limit: limit },
  })
}

// export function findOneById(id) {
//   return fetchAPI({
//     path: `/articles/${id}`,
//   })
// }
