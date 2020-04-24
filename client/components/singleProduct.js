import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
import {addToCart} from '../store/cart'
import {logout} from '../store'
import {user} from '../store/user'
import {persistedState} from '../store'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
  }

  handleClick = id => {
    if (!isLoggedIn) this.props.addToLocalStorage()
    this.props.addToCart(id)
    console.log('herrrrrreeeee', this.props.user)
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

    const user = this.props.user
    console.log('USER====>', user)
    console.log('LOCAL STORAGE===>', localStorage)
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
            onClick={() => this.props.addToCart(this.props.productId)}
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
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  singleProduct: productId => dispatch(getSingleProduct(productId)),
  addToCart: id => dispatch(addToCart(id)),
  addToLocalStorage: id => dispatch(addToLocalStorage(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
