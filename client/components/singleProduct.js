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
      <div>
        <div>
          <img src={imageURL} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>Rating: {rating}</p>
          <p>Price: {price}</p>
          <p>Description: {description}</p>
          <p>Type: {color}</p>
          <p>Region: {region}</p>
          <p>Size: {size}</p>
          <p>Year: {year}</p>
        </div>
        <div>
          <button type="submit" onClick={() => this.handleClick()}>
            Add to cart
          </button>
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
