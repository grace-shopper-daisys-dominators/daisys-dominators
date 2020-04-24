import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_NEW_USER = 'ADD_NEW_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'

/**
 * INITIAL STATE
 */
const allTheUsers = {
  all: [],
  singleUser: {}
}
/**
 * ACTION CREATORS
 */
const setAllUsers = users => ({type: GET_ALL_USERS, users})
const setSingleUser = user => ({type: GET_SINGLE_USER, user})
const setNewUser = newUser => ({type: ADD_NEW_USER, newUser})
/**
 * THUNK CREATORS
 */
export const getAllUsers = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/users')
      dispatch(setAllUsers(res.data))
    } catch (err) {
      console.error(err, 'USERS NOT FOUND')
    }
  }
}
export const getSingleUser = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}`)
      dispatch(setSingleUser(res.data))
    } catch (err) {
      console.error(err, 'USER NOT FOUND')
    }
  }
}

export const addNewUser = (firstName, lastName, email, password) => {
  return async dispatch => {
    try {
      const res = await axios.post('api/users', {
        firstName,
        lastName,
        email,
        password
      })
      dispatch(setNewUser(res.data))
    } catch (err) {
      console.error(err, 'USER NOT FOUND')
    }
  }
}
/**
 * REDUCER
 */
export default function(state = allTheUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, all: action.users}
    case GET_SINGLE_USER:
      return {singleUser: action.user}
    case ADD_NEW_USER:
      return {...state, all: action.newUser}
    default:
      return state
  }
}
