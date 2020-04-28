import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCartFromServer,
  removeItemFromServer,
  subtractQuantityFromServer,
  addQuantityToServer
} from '../../../store/cart'
import {me} from '../../../store/user'
import SingleCartItem from '../../singleCartItem'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.getAllItems(this.props.user, this.props.orderId)
    }
  }

  render() {
    const {items, removeItem, subQuantity, addQuantity, total} = this.props
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
    user: state.user.id,
    orderId: state.user.orderId,
    items: state.cart.items,
    total: state.cart.total
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),

    getAllItems: user => dispatch(fetchCartFromServer(user)),

    removeItem: (itemId, orderId, price) =>
      dispatch(removeItemFromServer(itemId, orderId, price)),

    subQuantity: (itemId, orderId, price) =>
      dispatch(subtractQuantityFromServer(itemId, orderId, price)),

    addQuantity: (itemId, orderId, price) =>
      dispatch(addQuantityToServer(itemId, orderId, price))
  }
}

export default connect(mapState, mapDispatch)(Cart)

//For guest: Find the ID on sessions if there isn't a userId aka logged in visitor
//Check to see where the data is being stored if its a guest render it from local storage IF NOT get from database
//Make sure guest doesn't have userId. Is it sessions id for guest?
