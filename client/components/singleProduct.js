import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
// import UpdateProductForm from '../components/updateProductForm'
import {
  addItemToServer,
  fetchCartFromServer,
  addQuantityToServer,
  addQuantityToStorage,
  addItemToLocalStorage,
  fetchCartFromLocalStorage
} from '../store/cart'
import {addToLocalStorage} from '../store/localStorage'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
    if (this.props.user.id) {
      this.props.getAllItems(this.props.user, this.props.orderId)
    } else {
      this.props.getAllItems()
    }
  }

  isLoggedIn = userId => {
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
      this.isLoggedIn(user.id)
    } else {
      this.isNotLoggedIn()
    }
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
    return (
      <div>
        <div>
          <img src={imageURL} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>Rating: {rating}</p>
          <hr />
          <p>Price: {price}</p>
          <p>Description: {description}</p>
          <p>Type: {color}</p>
          <p>Region: {region}</p>
          <p>Size: {size}</p>
          <p>Year: {year}</p>
        </div>
        {/** TODO: WORK ON UPDATE FORM BELOW */}
        {/*<UpdateProductForm />*/}
        <div>
          <button type="submit" onClick={() => this.handleClick()}>
            Add to cart
          </button>
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
