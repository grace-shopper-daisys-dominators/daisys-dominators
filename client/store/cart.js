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

//ACTION CREATOR
//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
const getCart = (cart, total) => {
  return {
    type: GET_CART,
    cart,
    total
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addToCart = (product, total) => {
  return {
    type: ADD_TO_CART,
    product,
    total
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const removeItem = (productId, total) => {
  return {
    type: REMOVE_ITEM,
    productId,
    total
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const subtractQuantity = product => {
  return {
    type: SUB_QUANTITY,
    product
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addQuantity = product => {
  return {
    type: ADD_QUANTITY,
    product
  }
}

export const fetchCartFromLocalStorage = () => {
  return dispatch => {
    try {
      const items = JSON.parse(localStorage.getItem('cart'))
      if (items) {
        const total = getTotal()
        dispatch(getCart(items, total))
      } else {
        dispatch(getCart([], 0))
      }
      //whats being received from localStorage
    } catch (err) {
      console.log(err, "COULDN'T GET FROM STORAGE CART")
    }
  }
}

export const fetchCartFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/me/current')
      let total = 0
      if (data[0].products.length > 0) {
        total = data[0].products[0].cart.total
      }
      console.log(data[0].products, 'HELLO')
      dispatch(getCart(data[0].products, total))
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
      dispatch(addToCart(product, product.price))
    } catch (err) {
      console.log(err, "COULDN'T ADD ITEM ")
    }
  }
}

export const addItemToServer = (product, productId, price) => {
  return async dispatch => {
    try {
      let order = await axios.get('/api/orders/me/current')
      let orderId = order.data[0].id
      const {data} = await axios.post('/api/cart', {
        productId,
        orderId,
        price
        //whats being sent to the backend
      })
      dispatch(addToCart(product, data.total))
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
      const newCart = removeFromLocalStorage(data)
      const total = getTotal()
      dispatch(removeItem(data.id, total))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T REMOVE ITEM FROM local")
    }
  }
}

export const removeItemFromServer = (productId, price) => {
  return async dispatch => {
    try {
      let order = await axios.get('/api/orders/me/current')
      let orderId = order.data[0].id
      let item = order.data[0].products.find(product => {
        return product.id === productId
      })
      let newPrice = item.cart.price
      await axios.delete(`/api/cart/${orderId}/${productId}`)
      dispatch(removeItem(productId, item.cart.total - newPrice))
      //whats being received from the backend
    } catch (err) {
      console.log(err, "COULDN'T REMOVE ITEM FROM DATABASE")
    }
  }
}

export const subtractQuantityFromServer = (productId, price) => {
  return async dispatch => {
    try {
      let order = await axios.get('/api/orders/me/current')
      let orderId = order.data[0].id
      let operation = 'remove'
      const {data} = await axios.put(`/api/cart/${orderId}`, {
        price,
        operation,
        productId
        //whats being sent to the backend
      })
      dispatch(subtractQuantity(data))
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
        const total = getTotal()
        dispatch(subtractQuantity(productId, total))
      } else {
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

export const addQuantityToServer = (productId, price) => {
  return async dispatch => {
    try {
      let order = await axios.get('/api/orders/me/current')
      let orderId = order.data[0].id
      let operation = 'add'
      const {data} = await axios.put(`/api/cart/${orderId}`, {
        price,
        operation,
        productId,
        orderId
        //whats being sent to the backend
      })
      console.log(data, 'IM DATA')
      dispatch(addQuantity(data))
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
    total: action.total
  }
}

const removeItemFromState = (state, action) => {
  const newState = state.items.filter(item => item.id !== action.productId)
  return {...state, items: newState, total: action.total}
}

//orderId, productId, price
//data.productId, data.total on the action
const subQuantityFromState = (state, action) => {
  let indexOfExistedItem = state.items.findIndex(
    item => item.id === action.product.productId
  )

  if (indexOfExistedItem >= 0) {
    const copyItems = [...state.items]
    copyItems[indexOfExistedItem].cart.quantity = action.product.quantity
    return {...state, items: copyItems, total: action.product.total}
  } else {
    return {state}
  }
}

const addQuantityFromState = (state, action) => {
  let indexOfExistedItem = state.items.findIndex(
    item => item.id === action.product.productId
  )
  if (indexOfExistedItem >= 0) {
    const copyItems = [...state.items]
    copyItems[indexOfExistedItem].cart.quantity = action.product.quantity
    return {...state, items: copyItems, total: action.product.total}
  } else {
    return {state}
  }
}

//To get quantity its on action.
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, items: action.cart, total: action.total}
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
