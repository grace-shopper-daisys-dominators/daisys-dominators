import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SingleCartItem from '../../singleCartItem'
import StripeCheckout from 'react-stripe-checkout'
import './style.css'
import {
  fetchCart,
  removeItemFromCart,
  addQuantityToCart,
  subtractQuantityFromCart
} from '../../../store/cart'

toast.configure()
//Guest should not have access to checkout unless they sign up!
export class Checkout extends React.Component {
  componentDidMount() {
    this.props.getAllItems()
  }

  handleToken = async token => {
    console.log(token, 'TOKEN')
    const response = await axios.post('/api/checkout/me', {
      token,
      items: this.props.items,
      total: this.props.total
    })
    const {status} = response.data
    if (status === 'success') {
      toast('Success! Check email for confirmation', {type: 'success'})
    } else {
      toast('Something went wrong', {type: 'error'})
    }
  }

  render() {
    const {
      items,
      removeItem,
      subQuantity,
      addQuantity,
      total,
      user,
      orderId
    } = this.props

    return (
      <div>
        <ToastContainer />
        <h1 id="page-title">Checkout Cart</h1>
        <div>
          <SingleCartItem
            orderId={orderId}
            items={items}
            removeItem={removeItem}
            subQuantity={subQuantity}
            addQuantity={addQuantity}
            user={user}
          />
          <div id="total">Total ${total}</div>
        </div>
        <StripeCheckout
          stripeKey={process.env.STRIPE_API_KEY}
          token={this.handleToken}
          amount={total * 100}
          billingAddress
          shippingAddress
        />
        <p>
          <Link id="back-to-cart" to="/cart">
            Back to cart
          </Link>
        </p>
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
    getAllItems: () => dispatch(fetchCart()),

    removeItem: itemId => {
      return dispatch(removeItemFromCart(itemId))
    },

    subQuantity: item => {
      return dispatch(subtractQuantityFromCart(item))
    },

    addQuantity: item => {
      return dispatch(addQuantityToCart(item))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
