import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct.js'
// import UpdateProductForm from '../components/updateProductForm'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
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
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  singleProduct: productId => dispatch(getSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
