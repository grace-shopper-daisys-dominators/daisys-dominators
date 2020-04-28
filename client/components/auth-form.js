import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {addNewUser} from '../store/user.js'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      {name === 'login' ? (
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <input name="email" type="text" placeholder="Email" required />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                required
              />
            </div>
            <div>
              <input name="email" type="text" placeholder="Email" required />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapLoginDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapSignUpDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(addNewUser(firstName, lastName, email, password, formName))
    }
  }
}
export const Login = connect(mapLogin, mapLoginDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapSignUpDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
