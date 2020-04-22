import React, {Component} from 'react'
import {connect} from 'react-redux'
import {link} from 'react-router-dom'
import {getSingleProduct} from '../store/singleProduct.js'

class SingleProduct extends Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    this.props.singleProduct(this.props.match.params.productId)
  }

  render() {
    // console.log(this.props.product)
    return <div>Single Product Info</div>
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => ({
  singleProduct: productId => dispatch(getSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
