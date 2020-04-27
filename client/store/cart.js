import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SUB_QUANTITY = 'SUB_QUANTITY'
const ADD_QUANTITY = 'ADD_QUANTITY'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addToCart = (product, total, productId, quantity) => {
  //TO DO: Specify exactly what is getting added from the product
  return {
    type: ADD_TO_CART,
    product,
    total,
    productId,
    quantity
  }
}

export const removeItem = (productId, total) => {
  return {
    type: REMOVE_ITEM,
    productId,
    total
  }
}

export const subtractQuantity = (productId, total) => {
  return {
    type: SUB_QUANTITY,
    productId,
    total
  }
}

export const addQuantity = (productId, total) => {
  return {
    type: ADD_QUANTITY,
    productId,
    total
  }
}

export const fetchCartFromServer = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/me/current', {userId})
      dispatch(getCart(data))
      //TO DO: DISCUSS WHAT NEEDS TO BE RETURNED >  NEED THE WHOLE ITEM TO SET FOR ITEMS STATE aka the complete item detail<
    } catch (err) {
      console.log(err, "COULDN'T FETCH CART")
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
      dispatch(
        addToCart(data.product, data.total, data.productId, data.quantity)
      )
      //TO DO: DISCUSS WHAT NEEDS TO BE RETURNED >  NEED THE WHOLE ITEM TO SET FOR ITEMS STATE aka the complete item detail<
      //ALSO ask if possible to sent the whole item/product object back so you can update state
    } catch (err) {
      console.log(err, "COULDN'T ADD ITEM TO DATABASE")
    }
  }
}

export const removeItemFromServer = (productId, orderId, price) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${orderId}`, {
        productId,
        price
      })
      dispatch(removeItem(data.productId, data.total))
    } catch (err) {
      console.log(err, "COULDN'T REMOVE ITEM FROM DATABASE")
    }
  }
}

export const subtractQuantityFromServer = (orderId, productId, price) => {
  return async dispatch => {
    try {
      let operation = 'remove'
      const {data} = await axios.put(`/api/carts/${orderId}`, {
        price,
        operation,
        orderId,
        productId
      })
      dispatch(subtractQuantity(data.productId, data.total))
    } catch (err) {
      console.log(err, "COULDN'T SUBTRACT QUANTITY FROM DATABASE")
    }
  }
}

export const addQuantityToServer = (orderId, productId, price) => {
  return async dispatch => {
    try {
      let operation = 'add'
      const {data} = await axios.put(`/api/carts/${orderId}`, {
        price,
        operation,
        productId,
        orderId
      })
      dispatch(addQuantity(data.productId, data.total))
    } catch (err) {
      console.log(err, "COULDN'T ADD QUANTITY FROM DATABASE")
    }
  }
}

const initialState = {
  items: [],
  total: 0
}

const addCartToState = (state, action) => {
  //THIS LOGIC NEEDS TO BE DONE IN THE BACKEND AS WELL SO IT'S SAVED THERE & NOT ONLY ON STATE!
  let existedItem = state.items.find(item => item.id === action.productId)
  if (existedItem) {
    existedItem.quantity += 1
    return {...state, total: action.total}
  } else {
    return {
      ...state,
      items: [...state.items, action.product],
      total: action.total
    }
  }
}

// HELPER FUNCTIONS FOR THE SWITCH CASE
const removeItemFromState = (state, action) => {
  const newState = state.items.filter(item => item.id !== action.productId)
  return {...state, items: newState, total: action.total}
}

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
