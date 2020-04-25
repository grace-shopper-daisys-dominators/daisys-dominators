import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <div>
      <div className="halo" />
      {/* <div>
        <span className="intro intro--the">The</span>
        <span className="intro intro--num">first #1</span>
        <span className="intro">vintage typeface</span>
      </div> */}
      <div className="vintage__container">
        <p className="vintage vintage__top">Daisy's Wine Shop</p>
        <p className="vintage vintage__bot">Daisy's Wine Shop</p>
      </div>
      {/* <div>
        <span className="outro">NO.01</span>
        <span className="outro outro--big">TYPEFACE RECREATED</span>
        <span className="outro">CSS</span>
        <span className="outro outro--smart">smart cookie</span>
      </div> */}
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {isAdmin ? (
            <div>
              <Link to="/home">Home</Link>
              <Link to="/users">Users</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
