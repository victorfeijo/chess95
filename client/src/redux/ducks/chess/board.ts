import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getBoard as getBoardReq } from '../../../api/chess/board'

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
