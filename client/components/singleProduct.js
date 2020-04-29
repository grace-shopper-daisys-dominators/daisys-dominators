import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
import UpdateProductForm from '../components/updateProductForm'
// import {addToCart} from '../store/cart'
import {
  addItemToServer,
  fetchCartFromServer,
  addQuantityToServer,
  addQuantityToStorage,
  addItemToLocalStorage,
  fetchCartFromLocalStorage
} from '../store/cart'
import {addToLocalStorage} from '../store/localStorage'
import './singleProduct.css'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {addedToCart: false}
  }

  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
    if (this.props.user.id) {
      this.props.getAllItems(this.props.user, this.props.orderId)
    } else {
      this.props.getAllItems()
    }
  }

  isLoggedIn = () => {
    const currProduct = this.props.product
    const {items, orderId, addQuantity} = this.props
    let existedItem = items.find(item => item.id === currProduct.id)
    if (existedItem) {
      addQuantity(currProduct.id, orderId, currProduct.price)
    } else {
      this.props.addToCart(
        currProduct,
        currProduct.id,
        this.props.orderId,
        currProduct.price
      )
    }
  }

  isNotLoggedIn = () => {
    const currProduct = this.props.product
    const {items, addQuantity, addToCart} = this.props
    console.log('items before add', items)
    let existedItem = items.find(item => item.id === currProduct.id)
    if (existedItem) {
      addQuantity(currProduct.id)
    } else {
      addToCart(currProduct)
    }
    console.log('items after add', items)
  }

  //NEED HELPER FUNC FOR GUEST STILL USING LOCAL STORAGE

  handleClick = () => {
    const {user} = this.props
    if (user) {
      this.isLoggedIn()
    } else {
      this.isNotLoggedIn()
    }

    this.setState({addedToCart: true})
    setTimeout(() => {
      this.setState({addedToCart: false})
    }, 2000)
  }

  render() {
    const {
      name,
      imageURL,
      color,
      description,
      price,
      region,
      size,
      year,
      rating
    } = this.props.product
    const {isAdmin} = this.props.user
    return (
      <div className="single-product-container">
        <div className="product-inner-container">
          <div id="img-container">
            <img src={imageURL} />
          </div>
          <div id="product-details">
            <ul>
              <li id="wine-name">{name}</li>
              <li>
                <b>Rating:</b> {rating}
              </li>
              <li>
                <b>Price:</b> {price}
              </li>
              <li>
                <b>Description:</b> {description}
              </li>
              <li>
                <b>Type:</b> {color}
              </li>
              <li>
                <b>Region:</b> {region}
              </li>
              <li>
                <b>Size:</b> {size}
              </li>
              <li>
                <b>Year:</b> {year}
              </li>
              <li>
                {this.state.addedToCart && <p>Item Was Added To Cart!</p>}
                <button
                  id="add-to-cart-btn"
                  type="submit"
                  onClick={() => this.handleClick()}
                >
                  Add to cart
                </button>
              </li>
            </ul>
          </div>
          <div />
        </div>
        <div>
          {isAdmin ? <UpdateProductForm wine={this.props.product} /> : ''}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  items: state.cart.items,
  product: state.singleProduct,
  user: state.user,
  orderId: state.user.orderId
})

//What's being sent to the backend
const mapDispatch = dispatch => ({
  singleProduct: productId => dispatch(getSingleProduct(productId)),
  getAllItems: (userId, orderId) => {
    if (userId) {
      return dispatch(fetchCartFromServer(userId, orderId))
    } else {
      return dispatch(fetchCartFromLocalStorage())
    }
  },
  addToCart: (product, productId, orderId, price) => {
    if (orderId) {
      return dispatch(addItemToServer(product, productId, orderId, price))
    } else {
      return dispatch(addItemToLocalStorage(product))
    }
  }, //product is being sent back so that thunk so that it can be added to state without getting from backend route
  addQuantity: (itemId, orderId, price) => {
    if (orderId) {
      return dispatch(addQuantityToServer(itemId, orderId, price))
    } else {
      return dispatch(addQuantityToStorage(itemId))
    }
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)
