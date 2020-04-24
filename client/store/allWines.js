import axios from 'axios'

const GET_WINES = 'GET_WINES'

const getWines = wines => {
  return {
    type: GET_WINES,
    wines
  }
}

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

export default function allWinesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WINES:
      return {...state, all: action.wines}
    default:
      return state
  }
}
