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
export const subtractQuantity = (productId, total) => {
  return {
    type: SUB_QUANTITY,
    productId,
    total
  }
}

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addQuantity = (productId, total) => {
  return {
    type: ADD_QUANTITY,
    productId,
    total
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      if (await checkId()) {
        //if a user is logged in
        const {data} = await axios.get('/api/orders/me/current')
        let total = 0
        if (data.products.length > 0) {
          total = data.products[0].total
        }
        dispatch(getCart(data.products, total))
      } else {
        //if a user is not logged in
        const items = JSON.parse(localStorage.getItem('cart'))
        if (items) {
          const total = getTotal()
          dispatch(getCart(items, total))
        } else {
          dispatch(getCart([], 0))
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const addItemToCart = product => {
  return async dispatch => {
    try {
      if (await checkId()) {
        //if a user is logged in
        let order = await axios.get('/api/orders/me/current')
        let orderId = order.data.id
        const {data} = await axios.post('/api/cart', {
          productId: product.id,
          price: product.price,
          orderId
        })
        dispatch(addToCart(product, data.total))
      } else {
        //if a user is not logged in
        addToLocalStorage(product)
        dispatch(addToCart(product, product.price))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeItemFromCart = productId => {
  return async dispatch => {
    try {
      if (await checkId()) {
        //if a user is logged in
        let order = await axios.get('/api/orders/me/current')
        let orderId = order.data.id
        let item = order.data.products.find(product => {
          return product.id === productId
        })
        let newPrice = item.order_product.price
        await axios.delete(`/api/cart/${orderId}/${productId}`)
        dispatch(removeItem(productId, item.total - newPrice))
      } else {
        //if a user is not logged in
        const {data} = await axios.get(`/api/products/${productId}`)
        removeFromLocalStorage(data)
        const total = getTotal()
        dispatch(removeItem(data.id, total))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const subtractQuantityFromCart = product => {
  return async dispatch => {
    try {
      if (await checkId()) {
        //if a user is logged in
        let order = await axios.get('/api/orders/me/current')
        let orderId = order.data.id
        let operation = 'remove'
        const {data} = await axios.put(`/api/cart/${orderId}`, {
          price: product.price,
          operation,
          productId: product.id
        })
        dispatch(subtractQuantity(product.id, data.total))
      } else {
        //if a user is not logged in
        const bool = removeQuantityToLocalStorage(product.id)
        if (bool) {
          const total = getTotal()
          dispatch(subtractQuantity(product.id, total))
        } else {
          const total = getTotal()
          dispatch(removeItem(product.id, total))
        }
      }
    } catch (err) {
      if (err.response.status === 304) {
        dispatch(removeItemFromCart(product.id))
      } else {
        console.error(err)
      }
    }
  }
}

export const addQuantityToCart = product => {
  return async dispatch => {
    try {
      if (await checkId()) {
        //if a user is logged in
        let order = await axios.get('/api/orders/me/current')
        let orderId = order.data.id
        let operation = 'add'
        const {data} = await axios.put(`/api/cart/${orderId}`, {
          price: product.price,
          productId: product.id,
          operation,
          orderId
        })
        dispatch(addQuantity(product.id, data.total))
      } else {
        //if a user is not logged in
        addQuantityToLocalStorage(product.id)
        const total = getTotal()
        dispatch(addQuantity(product.id, total))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  items: [],
  total: 0
}

// HELPER FUNCTIONS FOR THE SWITCH CASE

const addItemHelper = (state, action) => {
  return {
    ...state,
    items: [...state.items, action.product],
    total: action.total
  }
}

const removeItemHelper = (state, action) => {
  const newState = state.items.filter(item => item.id !== action.productId)
  return {...state, items: newState, total: action.total}
}

const subQuantityHelper = (state, action) => {
  let indexOfExistedItem = state.items.findIndex(
    item => item.id === action.productId
  )

  if (indexOfExistedItem >= 0) {
    const copyItems = [...state.items]
    const updatedItem = copyItems[indexOfExistedItem]
    updatedItem.quantity--
    return {...state, items: copyItems, total: action.total}
  } else {
    return {state}
  }
}

const addQuantityHelper = (state, action) => {
  let indexOfExistedItem = state.items.findIndex(
    item => item.id === action.productId
  )
  if (indexOfExistedItem >= 0) {
    const copyItems = [...state.items]
    const updatedItem = copyItems[indexOfExistedItem]
    updatedItem.quantity++
    return {...state, items: copyItems, total: action.total}
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
      return addItemHelper(state, action)
    case REMOVE_ITEM:
      return removeItemHelper(state, action)
    case SUB_QUANTITY:
      return subQuantityHelper(state, action)
    case ADD_QUANTITY:
      return addQuantityHelper(state, action)
    default:
      return state
  }
}

//Helper function to determine if the user is logged in or not
async function checkId() {
  const {data} = await axios.get('/auth/me')
  return !!data.id
}
