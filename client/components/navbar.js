import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

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
        <div className="links-container">
          <Link to="/home">
            <span className="nav-links" style={{display: 'block'}}>
              HOME
            </span>
          </Link>
          <Link to="/">
            <span className="nav-links" style={{display: 'block'}}>
              ALL WINES
            </span>
          </Link>
          <Link to="/redwines">
            <span className="nav-links" style={{display: 'block'}}>
              RED WINES
            </span>
          </Link>
          <Link to="/whitewines">
            <span className="nav-links" style={{display: 'block'}}>
              WHITE WINES
            </span>
          </Link>
          <Link to="/rosewines">
            <span className="nav-links" style={{display: 'block'}}>
              ROSÉS
            </span>
          </Link>
          {isAdmin ? (
            <Link className="nav-links" to="/users">
              USERS
            </Link>
          ) : (
            ''
          )}
          <a className="nav-links" href="#" onClick={handleClick}>
            LOGOUT
          </a>
          <Link className="nav-links" to="/orders">
            ORDER HISTORY
          </Link>
          <Link className="nav-links" to="/cart">
            CART
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/">
            <span className="nav-links" style={{display: 'block'}}>
              ALL WINES
            </span>
          </Link>
          <Link to="/redwines">
            <span className="nav-links" style={{display: 'block'}}>
              RED WINES
            </span>
          </Link>
          <Link to="/whitewines">
            <span className="nav-links" style={{display: 'block'}}>
              WHITE WINES
            </span>
          </Link>
          <Link to="/rosewines">
            <span className="nav-links" style={{display: 'block'}}>
              ROSÉ
            </span>
          </Link>
          <Link className="nav-links" to="/login">
            LOG IN
          </Link>
          <Link className="nav-links" to="/signup">
            SIGN UP
          </Link>
          <Link className="nav-links" to="/cart">
            CART
          </Link>
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
