import express from 'express'

import { getBoard } from './board'
import { knightMoves } from './knight'

const router = express.Router()

router.get('/board', getBoard)
router.get('/knight', knightMoves)

export const chess = router
