import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeItem, subtractQuantity, addQuantity} from '../../../store/cart'

export class Cart extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>Cart</h2>
        <div />
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.items
  }
}

const mapDispatch = dispatch => {
  return {
    removeItem: id => dispatch(removeItem(id)),
    subtractQuantity: id => dispatch(subtractQuantity(id)),
    addQuantity: id => dispatch(addQuantity(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
