import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCartFromServer,
  removeItemFromServer,
  subtractQuantityFromServer,
  addQuantityToServer
} from '../../../store/cart'
import SingleCartItem from '../../singleCartItem'

export class Cart extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getAllItems(this.props.user.id, this.props.orderId)
    } //ELSE if guest get from localstorage
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
        {/* {
          user ? ( */}
        <SingleCartItem
          items={items}
          removeItem={removeItem}
          subQuantity={subQuantity}
          addQuantity={addQuantity}
          orderId={orderId}
        />
        {/* ) : (
            //ACCESS THE LOCAL STORAGE
          )
        } */}
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
    getAllItems: () => dispatch(fetchCartFromServer()),

    removeItem: (itemId, orderId, price) =>
      dispatch(removeItemFromServer(itemId, orderId, price)),

    subQuantity: (itemId, orderId, price) =>
      dispatch(subtractQuantityFromServer(itemId, orderId, price)),

    addQuantity: (itemId, orderId, price) =>
      dispatch(addQuantityToServer(itemId, orderId, price))
  }
}

export default connect(mapState, mapDispatch)(Cart)
