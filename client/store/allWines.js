import axios from 'axios'

const GET_WINES = 'GET_WINES'
const ADD_NEW_WINE = 'ADD_NEW_WINE'

const getWines = wines => {
  return {
    type: GET_WINES,
    wines
  }
}

const setNewWine = newWine => {
  return {
    type: ADD_NEW_WINE,
    newWine
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

export const addNewWine = (
  name,
  imageURL,
  color,
  region,
  price,
  size,
  description,
  year
) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/products', {
        name,
        imageURL,
        color,
        region,
        price,
        size,
        description,
        year
      })
      dispatch(setNewWine(res.data))
    } catch (err) {
      console.log(err, 'UNABLE TO ADD NEW PRODUCT')
    }
  }
}

export default function allWinesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WINES:
      return {...state, all: action.wines}
    case ADD_NEW_WINE:
      return {...state, all: action.newWine}
    default:
      return state
  }
}
