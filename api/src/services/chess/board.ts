import { all, flatten, range, where } from 'ramda'

import { makeSquareFromPos, validateSquare } from './square'

export const validateBoard = where({
  squares: all(validateSquare)
})

export const makeBoard = () => {
  const boardRange = range(1, 9)
  const squares = flatten(
    boardRange.map(x => boardRange.map(y => makeSquareFromPos(x, y)))
  )

  return validateBoard({ squares }) ? { squares } : {}
}
