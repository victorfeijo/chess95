import { is, where } from 'ramda'

import { isAlgebricNotation, isBoardRange } from './predicates'

const mapPositions = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '7': 'G',
  '8': 'H',
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
}

export const validateSquare = square => (
  where({
    notation: isAlgebricNotation,
    x: isBoardRange,
    y: isBoardRange,
  })(square)
)

const makeSquare = square => (
  validateSquare(square) ? square : {}
)

export const makeSquareFromPos = (x, y) => (
  makeSquare({
    notation: `${mapPositions[x.toString()]}${y}`,
    x,
    y,
  })
)

export const makeSquareFromNotation = (notation) => (
  makeSquare({
    notation,
    x: mapPositions[notation[0]],
    y: parseInt(notation[1]),
  })
)
