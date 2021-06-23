import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
import UpdateProductForm from '../components/updateProductForm'
// import {addToCart} from '../store/cart'
import {addItemToCart, fetchCart, addQuantityToCart} from '../store/cart'
import './singleProduct.css'

export class SingleProduct extends Component {
  constructor() {
    super()

    this._isMounted = false
    this.state = {addedToCart: false}
  }

  async componentDidMount() {
    this._isMounted = true
    await this.props.singleProduct(this.props.match.params.productId)
    await this.props.getAllItems()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleClick = () => {
    const currProduct = this.props.product
    const {items, addQuantity, addToCart} = this.props
    if (items) {
      const existedItem = items.find(item => item.id === currProduct.id)
      if (existedItem) {
        addQuantity(currProduct)
      } else {
        addToCart(currProduct)
      }
      this.setState({addedToCart: true})
      setTimeout(() => {
        this._isMounted && this.setState({addedToCart: false})
      }, 2000)
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

const mapState = state => {
  return {
    items: state.cart.items,
    product: state.singleProduct,
    user: state.user
  }
}

//What's being sent to the backend
const mapDispatch = dispatch => ({
  singleProduct: productId => dispatch(getSingleProduct(productId)),
  getAllItems: () => {
    dispatch(fetchCart())
  },
  addToCart: product => {
    dispatch(addItemToCart(product))
  }, //product is being sent back so that thunk so that it can be added to state without getting from backend route
  addQuantity: item => {
    dispatch(addQuantityToCart(item))
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)
