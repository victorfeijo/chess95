import express from 'express'

import { makeBoard } from '../../services/chess/board'

const router = express.Router()

router.get('/chess', (req, res) => {
  const board = makeBoard()

  return res.status(200).send(board)
})

export const chess = router
