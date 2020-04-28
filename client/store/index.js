import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allUsers from './allUsers'
import singleProduct from './singleProduct'
import allWines from './allWines'
import cart from './cart'

const reducer = combineReducers({
  user,
  singleProduct,
  allWines,
  allUsers,
  cart
})
// import throttle from 'lodash/throttle'
// import {loadState, saveState} from './localStorage'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

// export const persistedState = loadState()

// const store = createStore(reducer, persistedState)

// store.subscribe(
//   throttle(() => {
//     saveState({
//       addToLocalStorage: store.getState().addToLocalStorage
//     })
//   }, 1000)
// )

export default store
export * from './user'
