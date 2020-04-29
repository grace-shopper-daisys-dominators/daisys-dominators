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
        <h2>Checkout Cart</h2>
        <div id="checkout">
          <div>
            <h2>Shipping Information</h2>
            <form>
              <label htmlFor="fname">First Name:</label>
              <input type="text" id="fname" name="fname" />
              <label htmlFor="lname">Last Name:</label>
              <input type="text" id="lname" name="lname" />
              <label htmlFor="address">Full Address:</label>
              <input type="text" name="address" />
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" />
              <div id="submitOrder">
                <input type="submit" value="Submit Order" />
                <input type="reset" />
              </div>
            </form>
          </div>
          <div>
            <SingleCartItem items={items} orderId={orderId} />
            <div>Total = {total}</div>
            <Link to="/cart">Go Back To Cart</Link>
          </div>
        </div>
        {/* <button type='submt' onClick={()= > }>Submit Order</button> */}
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
