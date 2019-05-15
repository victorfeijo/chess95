import { knightMovesIn } from '../../services/chess/operations'
import { isAlgebricNotation } from '../../services/chess/predicates'
import { makeSquareFromNotation } from '../../services/chess/square'

export const knightMoves = (req, res) => {
  const { position, turns } = req.query

  if(!isAlgebricNotation(position)) {
    return res.status(422).send({
      errors: ['The provided position should be a valid Algebric Notation.']
    })
  }

  const square = makeSquareFromNotation(position)
  const possibleMoves = knightMovesIn(square, turns || 2)

  return res.status(200).send({ possibleMoves })
}
