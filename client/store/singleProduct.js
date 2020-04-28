import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_WINE = 'UPDATE_WINE'
/**
 * INITIAL STATE
 */
const singleProduct = {}

/**
 * ACTION CREATORS
 */
export const setSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const updatedWine = wineToUpdate => {
  return {
    type: UPDATE_WINE,
    wineToUpdate
  }
}
/**
 * THUNK CREATORS
 */
export const getSingleProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      dispatch(setSingleProduct(res.data))
    } catch (err) {
      console.error(err, 'UNABLE TO GET SINGLE PRODUCT')
    }
  }
}

export const updateWine = (wineId, wineInfo) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/products/${wineId}`, wineInfo)
      console.log('info', res.data)
      dispatch(updatedWine(res.data))
    } catch (err) {
      console.log(err, 'UNABLE TO UPDATE PRODUCT')
    }
  }
}
/**
 * REDUCER
 */

export default function(state = singleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    case UPDATE_WINE:
      if (state.id === action.wineToUpdate.id) {
        return action.wineToUpdate
      } else {
        return state
      }
    default:
      return state
  }
}
