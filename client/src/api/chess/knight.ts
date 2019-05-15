import axios from 'axios'

export const getPossibleMoves = async (position) => {
  const { data } = await axios({
    method: 'get',
    url: '/chess/knight',
    params: { position },
  })

  return { possibleMoves: data }
}

