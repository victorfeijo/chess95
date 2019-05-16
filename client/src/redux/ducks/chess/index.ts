import { combineReducers } from 'redux'

import { board } from './board'
import { knight } from './knight'

export const chess = combineReducers({
  board,
  knight,
})
