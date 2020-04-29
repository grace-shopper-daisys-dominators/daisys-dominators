import React from 'react'
import {connect} from 'react-redux'

const singleCartItem = props => {
  const {removeItem, subQuantity, addQuantity, orderId} = props

  const {items} = props
  console.log(props)

  return (
    <div>
      {items
        ? items.map(item => {
            console.log('The current item', item)
            return (
              <div key={item.id}>
                <div>
                  <img src={item.imageURL} />
                  <p> Name: {item.name} </p>
                  <p> Color: {item.color} </p>
                  <p> Price: {item.price} </p>
                  <p> Size: {item.size} </p>
                </div>
                <button
                  type="submit"
                  onClick={() => removeItem(item.id, orderId)}
                >
                  Delete item
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    if (item.cart.quantity > 1) {
                      subQuantity(item.id, orderId, item.price)
                    } else {
                      removeItem(item.id, orderId)
                    }
                  }}
                >
                  - Quantity
                </button>
                {/* <button
              type="submit"
              onClick={() => addQuantity(item.id, orderId, item.price)}
            >
              Subtract Quantity
            </button> */}
                <button
                  type="submit"
                  onClick={() => addQuantity(item.id, orderId, item.price)}
                >
                  Add Quantity
                </button>
              </div>
            )
          })
        : ''}
    </div>
  )
}

const mapState = state => {
  return {
    items: state.cart.items
  }
}

export default connect(mapState)(singleCartItem)
