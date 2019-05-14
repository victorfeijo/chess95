import { is, isEmpty, union } from 'ramda'

import { makeSquareFromPos } from './square'

const knightPositions = [
  [2, 1],
  [2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [-2, 1],
  [-2, -1],
]

export const knightMoves = (square) => (
  knightPositions.reduce((acc, move) => {
    const moveSquare = makeSquareFromPos(square.x + move[0], square.y + move[1])

    return isEmpty(moveSquare) ? acc : union(acc, [moveSquare])
  }, [])
)

export const knightMovesIn = (squares, n) => {
  if (!is(Array, squares)) {
    squares = [squares]
  }

  const possibleMoves = squares.reduce((acc, square) => (
    union(acc, Array.from(knightMoves(square)))
  ), [])

  if (n === 1) {
    return possibleMoves
  }

  return knightMovesIn(possibleMoves, n-1)
}
