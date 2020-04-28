import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
// import UpdateProductForm from '../components/updateProductForm'
import {
  addItemToServer,
  fetchCartFromServer,
  addQuantityToServer
} from '../store/cart'
import {addToLocalStorage} from '../store/localStorage'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
    if (this.props.user.id) {
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

  //NEED HELPER FUNC FOR GUEST STILL USING LOCAL STORAGE

  handleClick = () => {
    const currProduct = this.props.product
    const {user} = this.props

    if (user) {
      this.isLoggedIn(user.id)
    } else {
      addToLocalStorage(currProduct)
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
  getAllItems: () => dispatch(fetchCartFromServer()),
  addToCart: (product, productId, orderId, price) =>
    dispatch(addItemToServer(product, productId, orderId, price)), //product is being sent back so that thunk so that it can be added to state without getting from backend route
  addQuantity: (productId, orderId, price) =>
    dispatch(addQuantityToServer(productId, orderId, price))
})

export default connect(mapState, mapDispatch)(SingleProduct)
