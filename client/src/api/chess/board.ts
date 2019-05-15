import axios from 'axios'

export const getBoard = async (params) => {
  const { data } = await axios({
    method: 'get',
    url: '/chess/board',
  })

  return { board: data }
}
