import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'

import { board, getBoard, initialBoardState } from './board'

describe('knight duck', () => {
  let store
  let httpMock

  beforeEach(() => {
    httpMock = new MockAdapter(axios)
    const mockStore = configureMockStore()
    store = mockStore(initialBoardState)
  })

  describe('get board', () => {
    describe('calling the action', () => {
      it('returns "me" payload in case of success', async () => {
        const boardPayload = {
          squares: ['A1', 'A2'],
        }

        httpMock.onGet('/chess/board').reply(200, boardPayload)

        await getBoard()(store.dispatch)

        const executedActions = store.getActions()
        const succeededPayload = executedActions.find((action) => action.type === getBoard.SUCCEEDED)

        expect(executedActions.map((action) => action.type)).toEqual([getBoard.STARTED, getBoard.SUCCEEDED, getBoard.ENDED])
        expect(succeededPayload).toEqual({
          type: getBoard.SUCCEEDED,
          payload: { board: boardPayload },
        })
      })

      it('when receiving a unprocessable entity returns error payload', async () => {
        httpMock.onGet('/chess/board').reply(422, {
          errors: ['Some cool error message'],
        })

        await getBoard()(store.dispatch)

        const executedActions = store.getActions()
        const failedPayload = executedActions.find((action) => action.type === getBoard.FAILED)

        expect(executedActions.map((action) => action.type)).toEqual([getBoard.STARTED, getBoard.FAILED, getBoard.ENDED])
        expect(failedPayload).toEqual({
          type: getBoard.FAILED,
          payload: { errors: ['Some cool error message'] },
        })
      })
    })

    describe('reducer', () => {
      let startedState = { squares: [], loading: true, errors: [] }
      let succeededState = { squares: ['A1', 'A2'] , loading: true, errors: [] }

      it('activates loading on start reducer', async () => {
        const startReducer = board(initialBoardState, { type: getBoard.STARTED })

        expect(startReducer).toEqual(startedState)
      })

      it('adds "squares" data when it succeeds', async () => {
        const succeededReducer = board(startedState, { type: getBoard.SUCCEEDED, payload: { board: { squares: ['A1', 'A2'] } } })

        expect(succeededReducer).toEqual(succeededState)
      })

      it('adds errors data when it fails', async () => {
        const failedReducer = board(startedState, { type: getBoard.FAILED, payload: { errors: ['OPS'] } })

        expect(failedReducer).toEqual({ errors: ['OPS'], loading: false, squares: [] })
      })

      it('sets loading equals to false when it ends', async () => {
        const succeededReducer = board(succeededState, { type: getBoard.ENDED, payload: { board: { squares: ['A1', 'A2'] } } })

        expect(succeededReducer).toEqual({ ...succeededState, loading: false })
      })
    })
  })
})
