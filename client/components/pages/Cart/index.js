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
import SingleCartItem from '../../singleCartItem'

export class Cart extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getAllItems(this.props.user.id, this.props.orderId)
      //ELSE if guest get from localstorage
    } else {
      this.props.getAllItems()
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

    return (
      <div>
        <h2>Cart</h2>
        {this.props.user.id ? (
          <SingleCartItem
            items={items}
            removeItem={removeItem}
            subQuantity={subQuantity}
            addQuantity={addQuantity}
            orderId={orderId}
          />
        ) : (
          <SingleCartItem
            items={items}
            removeItem={removeItem}
            subQuantity={subQuantity}
            addQuantity={addQuantity}
            orderId={null}
          />
        )}
        <div>Total = {total}</div>
        <Link to="/checkout">Checkout</Link>
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
    getItemsFromLocalStorage: () => dispatch(fetchCartFromLocalStorage())
  }
}

export default connect(mapState, mapDispatch)(Cart)
