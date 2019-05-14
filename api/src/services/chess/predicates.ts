import { is, test } from 'ramda'

export const isInteger = value => (
  is(Number, value) && (value >= 0) && (value % 1 == 0)
)

export const isBoardRange = value => (
  isInteger(value) && (value <= 8)
)

export const isAlgebricNotation = value => (
  test(/^([A-H])[1-8]$/, value)
)
