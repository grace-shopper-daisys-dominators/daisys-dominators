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
      <div>
        <span className="outro">NO.01</span>
        <span className="outro outro--big"> The best wine store ever! </span>
        <span className="outro">Daisy's wine</span>
        {/*<span className="outro outro--smart">smart cookie</span> */}
      </div>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">HOME</Link>
          <Link to="/orders">ORDER HISTORY</Link>
          <Link to="/carts">CART</Link>
          <a href="#" onClick={handleClick}>
            LOGOUT
          </a>
          {isAdmin ? (
            <div>
              <Link to="/home">HOME</Link>
              <Link to="/users">USERS</Link>
              <a href="#" onClick={handleClick}>
                LOGOUT
              </a>
            </div>
          ) : (
            <div>
              <Link to="/home">HOME</Link>
              <a href="#" onClick={handleClick}>
                LOGOUT
              </a>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">
            <span className="all-wines" style={{display: 'block'}}>
              ALL WINES
            </span>
          </Link>
          <Link to="/redwines">
            <span className="red" style={{display: 'block'}}>
              RED WINE
            </span>
          </Link>
          <Link to="/whitewines">
            <span className="white" style={{display: 'block'}}>
              WHITE WINE
            </span>
          </Link>
          <Link to="/rosewines">
            <span className="rose" style={{display: 'block'}}>
              ROSÉ
            </span>
          </Link>
          <Link to="/cart">CART</Link>
          <Link to="/login">LOG IN</Link>
          <Link to="/signup">SIGN UP</Link>
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
