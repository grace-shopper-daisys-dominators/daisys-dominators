import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const singleProduct = []

/**
 * ACTION CREATORS
 */
const setSingleProduct = singleProduct => ({
  type: GET_SINGLE_PRODUCT,
  singleProduct
})

/**
 * THUNK CREATORS
 */
export const getSingleProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`api/products/${productId}`)
      dispatch(setSingleProduct(res.data))
    } catch (err) {
      console.error(err, 'UNABLE TO GET SINGLE PRODUCT')
    }
  }
}
/**
 * REDUCER
 */

export default function(state = singleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
