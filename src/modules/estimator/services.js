import * as repository from './repository'

export async function estimateDistrance({ origin, destination } = {}) {
  return await repository.estimate({ origin, destination })
}
