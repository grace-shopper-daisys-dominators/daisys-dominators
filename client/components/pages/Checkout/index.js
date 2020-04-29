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
        <h2>Cart</h2>
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
