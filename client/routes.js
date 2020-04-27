import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import SingleProduct from './components/singleProduct'
//import HomePage from './components/pages/HomePage'
import Cart from './components/pages/Cart'

import HomePage from './components/pages/homePage/index.js'
import AllUsers from './components/pages/allUsers/AllUsers'
import SingleUser from './components/pages/singleUser/SingleUser'
import RedWines from './components/pages/redWines'
import WhiteWines from './components/pages/whiteWines'
import RoseWines from './components/pages/roseWines'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/carts" component={Cart} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/users/:userId" component={SingleUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={HomePage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/redwines" component={RedWines} />
        <Route exact path="/whitewines" component={WhiteWines} />
        <Route exact path="/rosewines" component={RoseWines} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/home"
              render={() => (
                <div>
                  <UserHome />
                  <HomePage />
                </div>
              )}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
