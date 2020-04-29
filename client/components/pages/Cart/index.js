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

    console.log(total, 'TOTALLL!')

    return (
      <div>
        <h2>Cart</h2>
        {this.props.user.id ? (
          <div>
            <SingleCartItem
              // items={items}
              removeItem={removeItem}
              subQuantity={subQuantity}
              addQuantity={addQuantity}
              orderId={orderId}
            />
            <div>Total = ${total}</div>
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
            <div>Total = ${localTotal}</div>
          </div>
        )}
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
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
