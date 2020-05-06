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
    if (this.props.user) {
      this.props.getUser(this.props.user.id)
      this.props.getAllItems(this.props.user.id)
    } else {
      this.props.getUser()
      this.props.getAllItems()
    }
  }

  componentDidUpdate(prevProp) {
    if (prevProp.user.id !== this.props.user.id) {
      console.log('New Id:', this.props.user.id)
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
      user
    } = this.props

    const localTotal = getTotal()

    return (
      <div id="main-cart-container">
        <h2 id="cart-title">Cart</h2>
        {this.props.user.id ? (
          <div>
            <SingleCartItem
              items={items}
              removeItem={removeItem}
              subQuantity={subQuantity}
              addQuantity={addQuantity}
              user={user}
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
              user={user}
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
    items: state.cart.items,
    total: state.cart.total
  }
}

const mapDispatch = dispatch => {
  return {
    getAllItems: userId => {
      if (userId) {
        return dispatch(fetchCartFromServer(userId))
      } else {
        return dispatch(fetchCartFromLocalStorage())
      }
    },

    removeItem: (itemId, price) => {
      if (price) {
        return dispatch(removeItemFromServer(itemId, price))
      } else {
        return dispatch(removeItemFromStorage(itemId))
      }
    },

    subQuantity: (itemId, price) => {
      if (price) {
        return dispatch(subtractQuantityFromServer(itemId, price))
      } else {
        return dispatch(subtractQuantityFromStorage(itemId))
      }
    },

    addQuantity: (itemId, price) => {
      if (price) {
        return dispatch(addQuantityToServer(itemId, price))
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
