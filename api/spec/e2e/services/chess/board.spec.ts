import {
  makeBoard,
  validateBoard,
} from '../../../../src/services/chess/board'

import { makeSquareFromNotation } from '../../../../src/services/chess/square'

describe('chess board', () => {
  describe('failure', () => {
    it('invalid squares', () => {
      const squares = ['B1', 'A1']

      const board = { squares }

      expect(validateBoard(board)).toEqual(false)
    })
  })

  describe('successful', () => {
    it('valid spec', () => {
      const squares = [
        makeSquareFromNotation('A1'),
        makeSquareFromNotation('A2'),
      ]

      const board = { squares }

      expect(validateBoard(board)).toEqual(true)
    })

    it('make board', () => {
      const board = makeBoard()

      expect(board.squares.length).toEqual(64)
      expect(board.squares[0]).toEqual({
        notation: 'A8',
        x: 1,
        y: 1,
      })
    })
  })
})
