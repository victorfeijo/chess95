import { all, flatten, range, reverse, where } from 'ramda'

import { makeSquareFromPos, validateSquare } from './square'

export const validateBoard = where({
  squares: all(validateSquare)
})

export const makeBoard = () => {
  const boardRange = range(1, 9)

  // Creates with correct board order
  const squares = flatten(
    reverse(boardRange).map(x => boardRange.map(y => makeSquareFromPos(y, x)))
  )

  return validateBoard({ squares }) ? { squares } : {}
}
