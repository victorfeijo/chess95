import { createAction, handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getPossibleMoves } from '../../../api/chess/knight'

export const initialKnightState = {
  possibleMoves: [],
  loading: false,
  errors: [],
}

export const possibleMoves = createActionThunk('POSSIBLE_MOVES', getPossibleMoves)
export const clearKnight = createAction('CLEAR_KNIGHT')

export const knight = handleActions(
  {
    [possibleMoves.STARTED]: (state) => ({
      ...state,
      loading: true,
    }),
    [possibleMoves.SUCCEEDED]: (state, { payload }) => ({
      ...state,
      possibleMoves: payload.possibleMoves,
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
    [clearKnight]: () => initialKnightState,
  },
  initialKnightState,
)
