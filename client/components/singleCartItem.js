import React from 'react'
import {connect} from 'react-redux'
import {sortBy} from 'lodash'
import './singleCartItem.css'

const singleCartItem = props => {
  const {items, removeItem, subQuantity, addQuantity} = props
  return (
    <div>
      {items
        ? sortBy(items, ['name']).map(item => {
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
                      <b>Quantity:</b> {item.quantity}
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
                            subQuantity(item)
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
                            addQuantity(item)
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          id="delete-item-btn"
                          type="submit"
                          onClick={() => removeItem(item.id)}
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
