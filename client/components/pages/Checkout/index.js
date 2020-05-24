import React from 'react'
import {connect} from 'react-redux'
import {fetchCartFromServer} from '../../../store/cart'
import SingleCartItem from '../../singleCartItem'
import {Link} from 'react-router-dom'
import './style.css'
export class Checkout extends React.Component {
  componentDidMount() {
    this.props.getAllItems()
  }

  render() {
    const {items, orderId, total} = this.props

    return (
      <div>
        <h1 id="page-title">Checkout Cart</h1>
        <div className="checkout-container">
          <div className="checkout-form-container">
            <h2 id="form-title">Shipping Information</h2>
            <form>
              <div>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First name"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last name"
                />
              </div>
              <div>
                <input type="text" name="address" placeholder="Address" />
              </div>
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div>
                <input
                  id="checkout-submit-btn"
                  type="submit"
                  value="Submit Order"
                />
              </div>
              <div>
                <input id="checkout-reset-btn" type="reset" value="Reset" />
              </div>
            </form>
          </div>
          {/* {
          user ? ( */}
          <div>
            <SingleCartItem items={items} orderId={orderId} />
            <p id="total">Total = ${total}</p>
            <Link id="back-to-cart" to="/cart">
              Back to cart
            </Link>
          </div>

          {/* ) : (
            //ACCESS THE LOCAL STORAGE
          )
        } */}

          {/* <button type='submt' onClick={()= > }>Submit Order</button> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    orderId: state.user.orderId,
    items: state.cart.items,
    total: state.cart.total
  }
}

const mapDispatch = dispatch => {
  return {
    getAllItems: () => dispatch(fetchCartFromServer())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
