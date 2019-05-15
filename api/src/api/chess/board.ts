import { makeBoard } from '../../services/chess/board'

export const getBoard = (req, res) => {
  const board = makeBoard()

  return res.status(200).send(board)
}
