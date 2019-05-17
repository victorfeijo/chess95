import { is, test } from 'ramda'

export const isInteger = (value: any): boolean => (
  is(Number, value) && (value >= 0) && (value % 1 == 0)
)

export const isBoardRange = (value: any): boolean => (
  isInteger(value) && (value <= 8)
)

export const isAlgebricNotation = (value: string): boolean => (
  test(/^([A-H])[1-8]$/, value)
)
