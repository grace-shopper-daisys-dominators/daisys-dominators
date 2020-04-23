import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const allTheUsers = []
/**
 * ACTION CREATORS
 */
const setSingleUser = user => ({type: GET_SINGLE_USER, user})
const setAllUsers = users => ({type: GET_ALL_USERS, users})

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
/**
 * REDUCER
 */
export default function(state = allTheUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case GET_SINGLE_USER:
      return action.user
    default:
      return state
  }
}
