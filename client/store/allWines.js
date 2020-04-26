import axios from 'axios'

const GET_WINES = 'GET_WINES'
const ADD_NEW_WINE = 'ADD_NEW_WINE'
const DELETE_WINE = 'DELETE_WINE'

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

const deletedWine = wineId => {
  return {
    type: DELETE_WINE,
    wineId
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

export const addNewWine = newWineInfo => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/products', newWineInfo)
      dispatch(setNewWine(res.data))
    } catch (err) {
      console.log(err, 'UNABLE TO ADD NEW PRODUCT')
    }
  }
}

export const deleteWine = wineId => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/products/${wineId}`)
      dispatch(deletedWine(res.data))
    } catch (err) {
      console.log(err, 'UNABLE TO DELETE PRODUCT')
    }
  }
}
export default function allWinesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WINES:
      return {...state, all: action.wines}
    case ADD_NEW_WINE:
      return {...state, all: [...state.all, action.newWine]}
    case DELETE_WINE:
      const filtered = state.all.filter(wine => wine.id !== action.wineId)
      return {...state, filtered}
    default:
      return state
  }
}
