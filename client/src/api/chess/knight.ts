import axios from 'axios'

export const getPossibleMoves = async (position, turns) => {
  const { data } = await axios({
    method: 'get',
    url: '/chess/knight',
    params: { position, turns },
  })

  return { possibleMoves: data }
}

