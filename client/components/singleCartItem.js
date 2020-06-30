import React from 'react'
import {connect} from 'react-redux'
import {sortBy} from 'lodash'
import './singleCartItem.css'

const singleCartItem = props => {
  const {items, removeItem, subQuantity, addQuantity, getAllItems, user} = props
  let currQuantity

  function addQuantityAndUpdate(id, price) {
    addQuantity(id, price)
    getAllItems(user.id)
  }

  function subQuantityAndUpdate(id, price) {
    subQuantity(id, price)
    getAllItems(user.id)
  }

  function handleClick(item) {
    console.log(item, 'IM CART')
    if (!user.id) {
      subQuantity(item.id)
    }

    if (item.cart.quantity === 1 && user.id) {
      removeItem(item.id, item.price)
      // getAllItems(user.id)
    } else {
      subQuantityAndUpdate(item.id, item.price)
    }

    // user.id ? subQuantityAndUpdate(item.id, item.price): subQuantity(item.id)
  }

  // console.log(window.location.pathname, "OOP")

  return (
    <div>
      {items
        ? sortBy(items, ['name']).map(item => {
            item.cart
              ? (currQuantity = item.cart.quantity)
              : (currQuantity = null)
            return (
              <div className="cart-container" key={item.id}>
                <div className="cart-details">
                  <div>
                    <img src={item.imageURL} />{' '}
                  </div>
                  <div>
                    <p>
                      {' '}
                      <b>Name:</b> {item.name}
                    </p>
                    <p>
                      {' '}
                      <b>Color:</b> {item.color}
                    </p>
                    <p>
                      {' '}
                      <b>Price:</b> ${item.price}
                    </p>
                    <p>
                      {' '}
                      <b>Quantity:</b> {currQuantity}
                    </p>
                    <p>
                      {' '}
                      <b>Size:</b> {item.size} ml{' '}
                    </p>
                    <div className="cart-btns">
                      <div>
                        <button
                          id="minus-quantity-btn"
                          type="submit"
                          onClick={() => {
                            handleClick(item)
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div>
                        <button
                          id="plus-quantity-btn"
                          type="submit"
                          onClick={() => {
                            user.id
                              ? addQuantityAndUpdate(item.id, item.price)
                              : addQuantity(item.id)
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          id="delete-item-btn"
                          type="submit"
                          onClick={() =>
                            user.id
                              ? removeItem(item.id, item.price)
                              : removeItem(item.id)
                          }
                        >
                          Delete item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : ''}
    </div>
  )
}

const mapState = state => {
  return {
    items: state.cart.items,
    user: state.user
  }
}

export default connect(mapState)(singleCartItem)
