import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AddNewProduct from './newProductForm'
import './user-home.css'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props.user

  return (
    <div>
      <h3 id="welcome-user-msg">Welcome, {firstName}!</h3>
      {isAdmin ? (
        <div>
          <AddNewProduct />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
