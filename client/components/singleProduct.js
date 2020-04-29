import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
import UpdateProductForm from '../components/updateProductForm'
import {addToCart} from '../store/cart'
import {addToLocalStorage} from '../store/localStorage'
import './singleProduct.css'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
  }

  handleClick = () => {
    const currProduct = this.props.product

    if (this.props.user.email) {
      this.props.addToCart(currProduct.id)
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
  product: state.singleProduct,
  user: state.user
})

const mapDispatch = dispatch => ({
  singleProduct: productId => dispatch(getSingleProduct(productId)),
  addToCart: id => dispatch(addToCart(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
