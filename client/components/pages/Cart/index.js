import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartFromServer, addItemToServer} from '../../../store/cart'
import {me} from '../../../store/user'
//import SingleCartItem from './singleCartItem'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.getAllItems(this.props.user)
    }
  }

  render() {
    const {user, items} = this.props
    return (
      <div>
        <h2>Cart</h2>
        {/* {
          user ? (
              <SingleCartItem items={items} />
          ) : (
            //ACCESS THE LOCAL STORAGE
          )
        } */}
        <Link to="/checkout">Checkout</Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.id,
    //CHECK WHAT IS GETTING BACK FROM THE THUNK
    items: state.cart.items
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getAllItems: user => dispatch(fetchCartFromServer(user))
  }
}

export default connect(mapState, mapDispatch)(Cart)

//For guest: Find the ID on sessions if there isn't a userId aka logged in visitor
//Check to see where the data is being stored if its a guest render it from local storage IF NOT get from database
//Make sure guest doesn't have userId. Is it sessions id for guest?
