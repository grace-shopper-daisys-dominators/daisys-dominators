import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
import {addToCart} from '../store/cart'
import {addToLocalStorage} from '../store/localStorage'

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
      // var currProductInCart = localStorage.getItem('cart')
      // console.log('currProductInCart: ', JSON.parse(currProductInCart))
    }

    // localStorage.setItem('cart', JSON.stringify(currProduct))
    // console.log('LOCAL STORAGE', localStorage)

    //localStorage.removeItem('cart')
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
        <div>
          <button
            type="submit"
            onClick={() => this.handleClick()}

            // onClick={() => this.props.addToCart(this.props.productId)}
          >
            Add to cart
          </button>
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
