import {
  makeSquareFromNotation,
  makeSquareFromPos,
  validateSquare,
} from '../../../../src/services/chess/square'

describe('chess square', () => {
  describe('failure', () => {
    it('empty square object', () => {
      const square = {}

      expect(validateSquare(square)).toEqual(false)
    })

    it('invalid notation', () => {
      const square = {
        notation: 'Z3',
        x: 4,
        y: 3,
      }

      expect(validateSquare(square)).toEqual(false)
    })

    it('invalid x', () => {
      const square = {
        notation: 'D3',
        x: 10,
        y: 3,
      }

      expect(validateSquare(square)).toEqual(false)
    })

    it('invalid y', () => {
      const square = {
        notation: 'D3',
        x: 4,
        y: -1,
      }

      expect(validateSquare(square)).toEqual(false)
    })

    it('cant create from pos', () => {
      expect(makeSquareFromPos(4, 10)).toEqual({})
    })

    it('cant create from notation', () => {
      expect(makeSquareFromNotation('AA')).toEqual({})
    })
  })

  describe('successful', () => {
    it('valid spec', () => {
      const square = {
        notation: 'D3',
        x: 4,
        y: 3,
      }

      expect(validateSquare(square)).toEqual(true)
    })

    it('successful creates from position', () => {
      const x = 7
      const y = 8

      expect(makeSquareFromPos(7, 8)).toEqual({
        notation: 'G8',
        x,
        y,
      })
    })

    it('successful creates from notation', () => {
      const notation = 'C4'

      expect(makeSquareFromNotation(notation)).toEqual({
        notation,
        x: 3,
        y: 4,
      })
    })
  })
})
