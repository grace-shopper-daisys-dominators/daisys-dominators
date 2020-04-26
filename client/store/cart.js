import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SUB_QUANTITY = 'SUB_QUANTITY'
const ADD_QUANTITY = 'ADD_QUANTITY'
// const ADD_SHIPPING = 'ADD_SHIPPING';

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addToCart = productId => {
  return {
    type: ADD_TO_CART,
    productId
  }
}

export const removeItem = (cartId, price) => {
  return {
    type: REMOVE_ITEM,
    cartId,
    price
  }
}

export const subtractQuantity = (productId, price) => {
  return {
    type: SUB_QUANTITY,
    productId,
    price
  }
}

export const addQuantity = (productId, price) => {
  return {
    type: ADD_QUANTITY,
    productId,
    price
  }
}

export const fetchCartFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/me/current')
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addItemToServer = (productId, orderId, price) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/carts', {
        productId,
        orderId,
        price
      })
      dispatch(addToCart(data.productId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeItemFromServer = (cartId, orderId) => {
  return async dispatch => {
    try {
      const {price} = await axios.get(`/api/carts/${cartId}`)
      await axios.delete(`/api/carts/${cartId}`, {orderId})
      dispatch(removeItem(cartId, price))
    } catch (err) {
      console.log(err)
    }
  }
}

export const subtractQuantityFromServer = (cartId, productId, price) => {
  return async dispatch => {
    try {
      let operation = 'remove'
      await axios.put(`/api/carts/${cartId}`, {price, operation, orderId})
      dispatch(subtractQuantity(productId, price))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addQuantityToServer = (cartId, productId, price) => {
  return async dispatch => {
    try {
      await axios.put(`/api/carts/${cartId}`)
      dispatch(addQuantity(productId, price))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  items: [],
  total: 0
}

const addToCartFromState = (state, action) => {
  let existedItem = state.items.find(item => item.id === action.id)
  if (existedItem) {
    existedItem.quantity += 1
    return {...state, total: state.total + existedItem.price}
  } else {
    return {
      ...state,
      items: [...state.items, action.productId],
      total: state.total + action.price
    }
  }
}

const removeItemFromState = (state, action) => {
  const newState = state.items.filter(item => item.id !== action.productId)
  return {...state, items: newState, total: state.total - action.price}
}

const subQuantityFromState = (state, action) => {
  let existedItem = state.items.find(item => item.id === action.productId)
  if (existedItem) {
    existedItem.quantity -= 1
    return {...state, total: state.total - existedItem.price}
  } else {
    return {...state, total: state.total}
  }
}

const addQuantityFromState = (state, action) => {
  let existedItem = state.items.find(item => item.id === action.productId)
  if (existedItem) {
    existedItem.quantity += 1
    return {...state, total: state.total + existedItem.price}
  } else {
    return {...state, total: state.total + action.price}
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, items: action.cart}
    case ADD_TO_CART:
      return addToCartFromState(state, action)
    case REMOVE_ITEM:
      return removeItemFromState(state, action)
    case SUB_QUANTITY:
      return subQuantityFromState(state, action)
    case ADD_QUANTITY:
      return addQuantityFromState(state, action)
    default:
      return state
  }
}
