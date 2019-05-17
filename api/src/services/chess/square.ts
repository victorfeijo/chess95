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

const mapBoardY = (y: number) => (Math.abs(y - 8) + 1)

export interface Square {
  notation: string;
  x: number;
  y: number;
}

export const validateSquare = where({
  notation: isAlgebricNotation,
  x: isBoardRange,
  y: isBoardRange,
})

const makeSquare = (square: Square) => (
  validateSquare(square) ? square : {}
)

export const makeSquareFromPos = (x: number, y: number) => (
  makeSquare({
    notation: `${mapPositions[x.toString()]}${mapBoardY(y)}`,
    x,
    y,
  })
)

export const makeSquareFromNotation = (notation: string) => (
  makeSquare({
    notation,
    x: mapPositions[notation[0]],
    y: mapBoardY(parseInt(notation[1])),
  })
)
