import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
import allWines from './allWines'
// import throttle from 'lodash/throttle'
// import {loadState, saveState} from './localStorage'

const reducer = combineReducers({
  user,
  allWines,
  singleProduct
})
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
