import * as repository from './repository'

export function estimateDistrance({ origin, destination } = {}) {
  return repository.estimate({ origin, destination })
}
