import axios from 'axios'
import {
  addToLocalStorage,
  removeFromLocalStorage,
  getTotal,
  addQuantityToLocalStorage,
  removeQuantityToLocalStorage
} from './localStorage'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SUB_QUANTITY = 'SUB_QUANTITY'
const ADD_QUANTITY = 'ADD_QUANTITY'

//ACTION CREATOR-
//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addToCart = (product, price) => {
  return {
    type: ADD_TO_CART,
    product,
    price
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const removeItem = (productId, orderId, price) => {
  return {
    type: REMOVE_ITEM,
    productId,
    orderId,
    price
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const subtractQuantity = (productId, orderId, price) => {
  return {
    type: SUB_QUANTITY,
    productId,
    orderId,
    price
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addQuantity = (productId, price) => {
  return {
    type: ADD_QUANTITY,
    productId,
    price
  }
}

export const fetchCartFromLocalStorage = () => {
  return dispatch => {
    try {
      const items = JSON.parse(localStorage.cart)
      console.log(items, 'HELLO IM CART DATA')
      dispatch(getCart(items))
      //whats being received from localStorage
    } catch (err) {
      console.log(err, "COULDN'T GET FROM STORAGE CART")
    }
  }
}

export const fetchCartFromServer = (userId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/orders/me/current/${userId}/${orderId}`
      )
      console.log(data, 'HELLO IM CART DATA')
      dispatch(getCart(data[0].products))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T FETCH CART")
    }
  }
}
export const addItemToLocalStorage = product => {
  return dispatch => {
    try {
      const cart = addToLocalStorage(product)
      console.log(cart, 'HELLO IM local DATA')
      dispatch(addToCart(product, product.price))
    } catch (err) {
      console.log(err, "COULDN'T ADD ITEM ")
    }
  }
}

export const addItemToServer = (product, productId, orderId, price) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/carts', {
        productId,
        orderId,
        price
        //whats being sent to the backend
      })
      dispatch(addToCart(product, data.price))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T ADD ITEM TO DATABASE")
    }
  }
}
export const removeItemFromStorage = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      console.log('product id=====>', productId)
      console.log('data=====>', data)
      const newCart = removeFromLocalStorage(data)
      const total = getTotal()
      dispatch(removeItem(data.id, total))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T REMOVE ITEM FROM local")
    }
  }
}

export const removeItemFromServer = (productId, orderId, price) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${orderId}`, {
        productId,
        price
        //whats being sent to the backend
      })
      dispatch(removeItem(data.productId, data.total))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T REMOVE ITEM FROM DATABASE")
    }
  }
}

export const subtractQuantityFromServer = (productId, orderId, price) => {
  return async dispatch => {
    try {
      let operation = 'remove'
      const {data} = await axios.put(`/api/carts/${orderId}`, {
        operation,
        productId,
        price
        //whats being sent to the backend
      })
      dispatch(subtractQuantity(data.productId, data.total))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T SUBTRACT QUANTITY FROM DATABASE")
    }
  }
}

export const subtractQuantityFromStorage = productId => {
  return dispatch => {
    try {
      const bool = removeQuantityToLocalStorage(productId)
      if (bool) {
        console.log('Should be true -->', bool)
        const total = getTotal()
        dispatch(subtractQuantity(productId, total))
      } else {
        console.log('Should be false -->', bool)
        const total = getTotal()
        dispatch(removeItem(productId, total))
      }
    } catch (err) {
      console.log(err, "COULDN'T SUBTRACT QUANTITY FROM DATABASE")
    }
  }
}

export const addQuantityToStorage = productId => {
  return dispatch => {
    try {
      addQuantityToLocalStorage(productId)
      const total = getTotal()
      dispatch(addQuantity(productId, total))
    } catch (err) {
      console.log(err, "COULDN'T ADD QUANTITY FROM LOCALSTORAGE")
    }
  }
}

export const addQuantityToServer = (productId, orderId, price) => {
  return async dispatch => {
    try {
      let operation = 'add'
      const {data} = await axios.put(`/api/carts/${orderId}`, {
        price,
        operation,
        productId,
        orderId
        //whats being sent to the backend
      })
      dispatch(addQuantity(data.productId, data.price))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T ADD QUANTITY FROM DATABASE")
    }
  }
}

const initialState = {
  items: [],
  total: 0
}

// HELPER FUNCTIONS FOR THE SWITCH CASE

const addCartToState = (state, action) => {
  return {
    ...state,
    items: [...state.items, action.product],
    total: state.total - action.price
  }
}

const removeItemFromState = (state, action) => {
  const newState = state.items.filter(item => item.id !== action.productId)
  return {...state, items: newState, total: action.total}
}

//orderId, productId, price
//data.productId, data.total on the action
const subQuantityFromState = (state, action) => {
  let existedItem = state.items.find(item => item.id === action.productId)
  if (existedItem && existedItem.quantity > 1) {
    existedItem.quantity -= 1
    return {...state, total: action.total}
  } else {
    return {...state, total: state.total}
  }
}

const addQuantityFromState = (state, action) => {
  let existedItem = state.items.find(item => item.id === action.productId)
  console.log(existedItem, 'I EXIST')
  if (existedItem) {
    existedItem.quantity += 1
    return {...state, total: action.total}
  } else {
    return {...state, total: state.total}
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, items: action.cart}
    case ADD_TO_CART:
      return addCartToState(state, action)
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
