import axios from 'axios'

const GET_WINES = 'GET_WINES'
const ADD_NEW_WINE = 'ADD_NEW_WINE'
const DELETE_WINE = 'DELETE_WINE'
const UPDATE_WINE = 'UPDATE_WINE'
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

const updatedWine = wineToUpdate => {
  return {
    type: UPDATE_WINE,
    wineToUpdate
  }
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

export const deleteWine = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/products/${id}`)
      dispatch(deletedWine(res.data))
    } catch (err) {
      console.log(err, 'UNABLE TO DELETE PRODUCT')
    }
  }
}

export const updateWine = (wineId, wineInfo) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/products/${wineId}`, wineInfo)
      dispatch(updatedWine(res.data))
    } catch (err) {
      console.log(err, 'UNABLE TO UPDATE PRODUCT')
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
    case ADD_NEW_WINE:
      return {...state, all: [...state.all, action.newWine]}
    case DELETE_WINE:
      return {
        ...state,
        all: state.all.filter(wine => wine.id !== action.wineId)
      }
    case UPDATE_WINE:
      return state.all.map(wine => {
        if (wine.id === action.wineToUpdate.id) {
          return action.wineToUpdated
        } else {
          return wine
        }
      })
    default:
      return state
  }
}
