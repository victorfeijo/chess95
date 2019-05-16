import { apiRequest } from '../../../spec-helper'

describe('knight moves', () => {
  describe('failure', () => {
    it('blank position param', async () => {
      const params = {}

      const { status, body } = await apiRequest.get('/api/chess/knight').query(params)

      expect(status).toEqual(422)
      expect(body).toEqual({
        errors: ['The provided position should be a valid Algebric Notation.']
      })
    })

    it('position not a in Algebric Notation', async () => {
      const params = { position: '34' }

      const { status, body } = await apiRequest.get('/api/chess/knight').query(params)

      expect(status).toEqual(422)
      expect(body).toEqual({
        errors: ['The provided position should be a valid Algebric Notation.']
      })
    })
  })

  describe('success', () => {
    it('return all possible moves from provided position', async () => {
      const params = { position: 'A1' }

      const { status, body } = await apiRequest.get('/api/chess/knight').query(params)

      const notations = body.map(move => move.notation)

      expect(status).toEqual(200)
      expect(notations).toEqual(['E3', 'E1', 'D4', 'B4', 'A3', 'A1', 'D2', 'C5', 'C1', 'A5'])
    })

    it('return all possible moves from provided position in 1 turn', async () => {
      const params = { position: 'A1', turns: 1 }

      const { status, body } = await apiRequest.get('/api/chess/knight').query(params)

      const notations = body.map(move => move.notation)

      expect(status).toEqual(200)
      expect(notations).toEqual(['C2', 'B3'])
    })
  })
})
