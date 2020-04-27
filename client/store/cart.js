import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const SUB_QUANTITY = 'SUB_QUANTITY'
const ADD_QUANTITY = 'ADD_QUANTITY'
// const ADD_SHIPPING = 'ADD_SHIPPING';

const getCart = () => {}

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  }
}

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  }
}

export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  }
}

export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  }
}

const initialState = {
  items: [],
  total: 0
}

export const fetchCartFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/current')
      dispatch()
    } catch (err) {
      console.log(err)
    }
  }
}

export const addItemToServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/carts')
      dispatch(addToCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// export const removeItemFromServer = () => {
//   return async dispatch => {
//     try {

//     }
//   }
// }

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let existedItem = state.items.find(item => action.id === item.id)
      if (existedItem) {
        existedItem.quantity += 1
        return {...state, total: state.total + existedItem.price}
      } else {
        existedItem.quantity = 1
        let newTotal = state.total + existedItem.price
        return {...state, items: [...state.items, existedItem], total: newTotal}
      }

    default:
      return state
  }
}
