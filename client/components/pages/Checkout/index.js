import React from 'react'
import {connect} from 'react-redux'
import {fetchCartFromServer} from '../../../store/cart'
import SingleCartItem from '../../singleCartItem'
import {Link} from 'react-router-dom'

export class Checkout extends React.Component {
  componentDidMount() {
    this.props.getAllItems()
  }

  render() {
    const {items, orderId, total} = this.props

    return (
      <div>
        <h2>Checkout Cart</h2>
        <div>
          <h2>Shipping Information</h2>
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
              <input type="email" id="email" name="email" placeholder="email" />
            </div>
            <div>
              <input type="submit" value="Submit Order" />
            </div>
            <div>
              <input type="reset" value="Reset" />
            </div>
          </form>
        </div>
        {/* {
          user ? ( */}
        <SingleCartItem items={items} orderId={orderId} />
        {/* ) : (
            //ACCESS THE LOCAL STORAGE
          )
        } */}
        <div>Total = {total}</div>
        <Link to="/cart">Go Back To Cart</Link>
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
