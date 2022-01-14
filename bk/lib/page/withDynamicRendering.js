import compose from 'lodash/flowRight'
import { withErrorHandling } from '@lib/error'
import { withUA } from '@lib/userAgent'

export default function withDynamicRendering(options = {}) {
  return function(Component) {
    const hocs = [withUA, withErrorHandling]

    return compose(...hocs)(Component)
  }
}
