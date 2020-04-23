import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const allUsers = []

/**
 * ACTION CREATORS
 */
const setAllUsers = users => ({type: GET_ALL_USERS, users})

/**
 * THUNK CREATORS
 */
export const getAllUsers = () => {
  return async dispatch => {
    try {
      const users = await axios.get('/api/users')
      dispatch(setAllUsers(users))
    } catch (err) {
      console.error(err, 'USERS NOT FOUND')
    }
  }
}
/**
 * REDUCER
 */
export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...action.users}
    default:
      return state
  }
}
