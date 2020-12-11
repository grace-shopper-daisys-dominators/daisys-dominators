import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCart,
  removeItemFromCart,
  subtractQuantityFromCart,
  addQuantityToCart
} from '../../../store/cart'
import {me} from '../../../store/user'
import SingleCartItem from '../../singleCartItem'
import './style.css'
export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getAllItems()
  }

  // componentDidUpdate(prevProp) {
  //   if (prevProp.user.id !== this.props.user.id) {
  //     this.props.getAllItems(this.props.user.id)
  //   }
  // }

  render() {
    const {
      items,
      removeItem,
      subQuantity,
      addQuantity,
      total,
      user
    } = this.props

    return (
      <div id="main-cart-container">
        <h2 id="cart-title">Cart</h2>
        <div>
          <SingleCartItem
            items={items}
            removeItem={removeItem}
            subQuantity={subQuantity}
            addQuantity={addQuantity}
          />
          <div className="checkout-total">
            <p className="total-count">Total = ${total}</p>
            {user.id ? (
              <Link id="link-to-checkout" to="/checkout">
                Checkout
              </Link>
            ) : (
              <h1>To checkout please sign up!</h1>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.cart.items,
    total: state.cart.total,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getAllItems: () => {
      return dispatch(fetchCart())
    },

    removeItem: itemId => {
      return dispatch(removeItemFromCart(itemId))
    },

    subQuantity: item => {
      return dispatch(subtractQuantityFromCart(item))
    },

    addQuantity: item => {
      return dispatch(addQuantityToCart(item))
    },
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
