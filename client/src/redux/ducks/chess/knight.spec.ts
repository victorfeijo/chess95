import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'

import { clearKnight, initialKnightState, knight, possibleMoves } from './knight'

describe('knight duck', () => {
  let store
  let httpMock

  beforeEach(() => {
    httpMock = new MockAdapter(axios)
    const mockStore = configureMockStore()
    store = mockStore(initialKnightState)
  })

  describe('get possible moves', () => {
    describe('calling the action', () => {
      it('returns "possible moves" payload in case of success', async () => {
        const movesPayload = ['A1', 'A2']

        httpMock.onGet('/chess/knight').reply(200, movesPayload)

        await possibleMoves()(store.dispatch)

        const executedActions = store.getActions()
        const succeededPayload = executedActions.find((action) => action.type === possibleMoves.SUCCEEDED)

        expect(executedActions.map((action) => action.type)).toEqual([possibleMoves.STARTED, possibleMoves.SUCCEEDED, possibleMoves.ENDED])
        expect(succeededPayload).toEqual({
          type: possibleMoves.SUCCEEDED,
          payload: { possibleMoves: movesPayload },
        })
      })

      it('when receiving a unprocessable entity returns error payload', async () => {
        httpMock.onGet('/chess/knight').reply(422, {
          errors: ['Some cool error message'],
        })

        await possibleMoves()(store.dispatch)

        const executedActions = store.getActions()
        const failedPayload = executedActions.find((action) => action.type === possibleMoves.FAILED)

        expect(executedActions.map((action) => action.type)).toEqual([possibleMoves.STARTED, possibleMoves.FAILED, possibleMoves.ENDED])
        expect(failedPayload).toEqual({
          type: possibleMoves.FAILED,
          payload: { errors: ['Some cool error message'] },
        })
      })
    })

    describe('reducer', () => {
      let startedState = { possibleMoves: [], loading: true, errors: [] }
      let succeededState = { possibleMoves: ['A1', 'A2'] , loading: true, errors: [] }

      it('activates loading on start reducer', async () => {
        const startReducer = knight(initialKnightState, { type: possibleMoves.STARTED })

        expect(startReducer).toEqual(startedState)
      })

      it('adds "possible moves" data when it succeeds', async () => {
        const succeededReducer = knight(startedState, { type: possibleMoves.SUCCEEDED, payload: { possibleMoves: ['A1', 'A2'] } })

        expect(succeededReducer).toEqual(succeededState)
      })

      it('adds errors data when it fails', async () => {
        const failedReducer = knight(startedState, { type: possibleMoves.FAILED, payload: { errors: ['OPS'] } })

        expect(failedReducer).toEqual({ errors: ['OPS'], loading: false, possibleMoves: [] })
      })

      it('sets loading equals to false when it ends', async () => {
        const succeededReducer = knight(succeededState, { type: possibleMoves.ENDED, payload: { possibleMoves: ['A1', 'A2'] } })

        expect(succeededReducer).toEqual({ ...succeededState, loading: false })
      })

      it('sets initial state when clearKnight called', async () => {
        const reducer = knight(succeededState, { type: clearKnight })

        expect(reducer).toEqual(initialKnightState)
      })
    })
  })
})

