import axios from 'axios'

const GET_WINES = 'GET_WINES'
const GET_RED_WINES = 'GET_RED_WINES'

const getWines = wines => {
  return {
    type: GET_WINES,
    wines
  }
}
// const getWines = wines => {
//   return {
//     type: GET_RED_WINES,
//     wines
//   }
// }

const initialState = {
  all: []
}

export const fetchWinesFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getWines(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const fetchRedWinesFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      console.log(data, 'FROM ALL WINE')
      dispatch(getWines(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function allWinesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WINES:
      console.log(state, 'FROM ALL WINE')
      return {...state, all: action.wines}
    case GET_RED_WINES:
      console.log(state, 'FROM ALL WINE')
      return {...state, all: action.wines}
    default:
      return state
  }
}
