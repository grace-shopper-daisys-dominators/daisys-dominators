import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AddNewProduct from './NewProductForm'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props.user

  return (
    <div>
      {isAdmin ? (
        <div>
          <AddNewProduct />
        </div>
      ) : (
        ''
      )}
      <h3>Welcome, {firstName} !</h3>
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
