import { configureStore } from '../redux/configure-store'

import {
  selectBoard,
  selectBoardRows,
  selectKnight,
  selectPossibleNotations,
} from './chess'

describe('selectors', () => {
  describe('board', () => {
    it('select board', () => {
      const store = configureStore().getState()

      expect(selectBoard(store)).toEqual({
        errors: [],
        loading: false,
        squares: [],
      })
    })

    it('select board rows', () => {
      const store = configureStore().getState()
      store.chess.board.squares = [
        'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8',
        'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
        'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
        'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
        'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
        'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
        'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
        'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1',
      ]

      expect(selectBoardRows(store)).toEqual([
        ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'],
        ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
        ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6'],
        ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5'],
        ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
        ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'],
        ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
        ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'],
      ])
    })
  })

  describe('knight', () => {
    it('select knight', () => {
      const store = configureStore().getState()

      expect(selectKnight(store)).toEqual({
        errors: [],
        loading: false,
        possibleMoves: [],
      })
    })

    it('select possible notations', () => {
      const store = configureStore().getState()
      store.chess.knight.possibleMoves = [
        { notation: 'A1', x: 1, y: 1 },
        { notation: 'B2', x: 2, y: 2 },
        { notation: 'H6', x: 8, y: 6 },
      ]

      expect(selectPossibleNotations(store)).toEqual(['A1', 'B2', 'H6'])
    })
  })
})

