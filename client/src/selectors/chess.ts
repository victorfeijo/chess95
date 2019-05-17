import { splitEvery } from 'ramda'
import { createSelector } from 'reselect'

export const selectBoard = state => state.chess.board
export const selectKnight = state => state.chess.knight

export const selectPossibleNotations = createSelector(
  selectKnight,
  knight => knight.possibleMoves.map(move => move.notation)
)

export const selectBoardRows = createSelector(
  selectBoard,
  board => splitEvery(8, board.squares)
)
