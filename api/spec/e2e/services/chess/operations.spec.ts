import { knightMoves, knightMovesIn } from '../../../../src/services/chess/operations'

import { makeSquareFromNotation } from '../../../../src/services/chess/square'

describe('chess operations', () => {
  describe('knight moves', () => {
    it('invalid board position', () => {
      const knightSquare = makeSquareFromNotation('D9')

      const possibleMoves = knightMoves(knightSquare)

      expect(possibleMoves).toEqual([])
    })

    it('success move to two squares - from A1', () => {
      const knightSquare = makeSquareFromNotation('A1')

      const possibleMoves = knightMoves(knightSquare)

      const notations = possibleMoves.map(move => move.notation)

      expect(notations).toEqual(['C2', 'B3'])
    })

    it('success move to six squares - from D4', () => {
      const knightSquare = makeSquareFromNotation('D4')

      const possibleMoves = knightMoves(knightSquare)

      const notations = possibleMoves.map(move => move.notation)

      expect(notations).toEqual(['F5', 'F3', 'E6', 'E2', 'C6', 'C2', 'B5', 'B3'])
    })
  })

  describe('knight moves in', () => {
    it('success move to in exactly 2 turns - from A1', () => {
      const knightSquare = makeSquareFromNotation('A1')

      const possibleMoves = knightMovesIn(knightSquare, 2)

      const notations = possibleMoves.map(move => move.notation)

      expect(notations).toEqual(['E3', 'E1', 'D4', 'B4', 'A3', 'A1', 'D2', 'C5', 'C1', 'A5'])
    })

    it('success move to in exactly 2 turns - from D4 ', () => {
      const knightSquare = makeSquareFromNotation('D4')

      const possibleMoves = knightMovesIn(knightSquare, 2)

      const notations = possibleMoves.map(move => move.notation)

      expect(notations).toEqual([
        'H6', 'H4', 'G7', 'G3',
        'E7', 'E3', 'D6', 'D4',
        'H2', 'G5', 'G1', 'E5',
        'E1', 'D2', 'F8', 'F4',
        'D8', 'C7', 'C5', 'C3',
        'C1', 'B8', 'B4', 'A7',
        'A5', 'A3', 'A1',
      ])
    })
  })
})
