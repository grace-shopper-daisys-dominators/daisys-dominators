import React from 'react'
import {connect} from 'react-redux'
import {sortBy} from 'lodash'
import './singleCartItem.css'

const singleCartItem = props => {
  const {items, removeItem, subQuantity, addQuantity, user} = props
  let currQuantity

  // const addQuantityAndUpdate = (id, price) => {
  //   addQuantity(id, price)
  // }

  // const localStorageAddAndUpdate = id => {
  //   addQuantity(id)
  //   getAllItems()
  // }

  // const subQuantityAndUpdate = (id, price) => {
  //   subQuantity(id, price)
  // }

  // const localStorageSubAndUpdate = id => {
  //   subQuantity(id)
  //   getAllItems()
  // }

  // const handleClick = item => {
  //   if (!user.id) {
  //     localStorageSubAndUpdate(item.id)
  //   } else if (item.cart.quantity === 1 && user.id) {
  //     removeItem(item.id, item.price)
  //   } else {
  //     subQuantityAndUpdate(item.id, item.price, user.id)
  //   }
  // }

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
                      <b>Quantity:</b>{' '}
                      {currQuantity ? currQuantity : item.quantity}
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
                            user.id
                              ? subQuantity(item.id, item.price)
                              : subQuantity(item.id)
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
                              ? addQuantity(item.id, item.price)
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
