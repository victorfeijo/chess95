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

      expect(notations).toEqual(['F3', 'F5', 'E2', 'E6', 'C2', 'C6', 'B3', 'B5'])
    })
  })

  describe('knight moves in', () => {
    it('success move to in exactly 2 turns - from A1', () => {
      const knightSquare = makeSquareFromNotation('A1')

      const possibleMoves = knightMovesIn(knightSquare, 2)

      const notations = possibleMoves.map(move => move.notation)

      expect(notations).toEqual(['E1', 'E3', 'D4', 'B4', 'A1', 'A3', 'D2', 'C1', 'C5', 'A5'])
    })

    it('success move to in exactly 2 turns - from D4 ', () => {
      const knightSquare = makeSquareFromNotation('D4')

      const possibleMoves = knightMovesIn(knightSquare, 2)

      const notations = possibleMoves.map(move => move.notation)

      expect(notations).toEqual([
        'H2', 'H4', 'G1', 'G5',
        'E1', 'E5', 'D2', 'D4',
        'H6', 'G3', 'G7', 'E3',
        'E7', 'D6', 'F4', 'C1',
        'C3', 'F8', 'D8', 'C5',
        'C7', 'B4', 'A1', 'A3',
        'B8', 'A5', 'A7'
      ])
    })
  })
})
