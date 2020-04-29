import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCartFromServer,
  removeItemFromServer,
  subtractQuantityFromServer,
  addQuantityToServer,
  fetchCartFromLocalStorage,
  removeItemFromStorage,
  addQuantityToStorage,
  subtractQuantityFromStorage
} from '../../../store/cart'
import {me} from '../../../store/user'
import SingleCartItem from '../../singleCartItem'
import {getTotal} from '../../../store/localStorage'
import './style.css'
export class Cart extends React.Component {
  componentDidMount() {
    console.log('USER ID ------>', this.props.user.id)
    this.props.getAllItems(this.props.user.id)
    this.props.getUser()
  }

  componentDidUpdate(prevProp) {
    if (prevProp.user.id !== this.props.user.id) {
      this.props.getAllItems(this.props.user.id)
    }
  }

  render() {
    const {
      items,
      removeItem,
      subQuantity,
      addQuantity,
      total,
      orderId
    } = this.props

    const localTotal = getTotal()

    return (
      <div id="main-cart-container">
        <h2 id="cart-title">Cart</h2>
        {this.props.user.id ? (
          <div>
            <SingleCartItem
              removeItem={removeItem}
              subQuantity={subQuantity}
              addQuantity={addQuantity}
              orderId={orderId}
            />
            <div className="checkout-total">
              <div className="total-count">Total = ${total}</div>
              <Link id="link-to-checkout" to="/checkout">
                Checkout
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <SingleCartItem
              items={items}
              removeItem={removeItem}
              subQuantity={subQuantity}
              addQuantity={addQuantity}
              orderId={null}
            />
            <div className="checkout-total">
              <div className="total-count">Total = ${localTotal}</div>
            </div>
          </div>
        )}
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
    getAllItems: (userId, orderId) => {
      if (userId) {
        return dispatch(fetchCartFromServer(userId, orderId))
      } else {
        return dispatch(fetchCartFromLocalStorage())
      }
    },

    removeItem: (itemId, orderId, price) => {
      if (orderId) {
        return dispatch(removeItemFromServer(itemId, orderId, price))
      } else {
        return dispatch(removeItemFromStorage(itemId))
      }
    },

    subQuantity: (itemId, orderId, price) => {
      if (orderId) {
        return dispatch(subtractQuantityFromServer(itemId, orderId, price))
      } else {
        return dispatch(subtractQuantityFromStorage(itemId))
      }
    },

    addQuantity: (itemId, orderId, price) => {
      if (orderId) {
        return dispatch(addQuantityToServer(itemId, orderId, price))
      } else {
        return dispatch(addQuantityToStorage(itemId))
      }
    },
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
