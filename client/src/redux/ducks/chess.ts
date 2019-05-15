import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getBoard as getBoardReq } from '../../api/chess/board'
import { getPossibleMoves } from '../../api/chess/knight'

export const initialBoardState = {
  squares: [],
  loading: false,
  errors: [],
}

export const getBoard = createActionThunk('GET_BOARD', getBoardReq)

export const board = handleActions(
  {
    [getBoard.STARTED]: (state) => ({
      ...state,
      loading: true,
    }),
    [getBoard.SUCCEEDED]: (state, { payload }) => ({
      ...state,
      squares: payload.board.squares,
    }),
    [getBoard.FAILED]: (state, { payload }) => ({
      ...state,
      loading: false,
      errors: payload.errors,
    }),
    [getBoard.ENDED]: (state) => ({
      ...state,
      loading: false,
    }),
  },
  initialBoardState,
)

export const initialKnightState = {
  possibleMoves: [],
  loading: false,
  errors: [],
}

export const possibleMoves = createActionThunk('POSSIBLE_MOVES', getPossibleMoves)

export const knight = handleActions(
  {
    [possibleMoves.STARTED]: (state) => ({
      ...state,
      loading: true,
    }),
    [possibleMoves.SUCCEEDED]: (state, { payload }) => ({
      ...state,
      possibleMoves: payload.possibleMoves.possibleMoves,
    }),
    [possibleMoves.FAILED]: (state, { payload }) => ({
      ...state,
      loading: false,
      errors: payload.errors,
    }),
    [possibleMoves.ENDED]: (state) => ({
      ...state,
      loading: false,
    }),
  },
  initialKnightState,
)

export const chess = combineReducers({
  board,
  knight,
})
