import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {link} from 'react-router-dom'
import {getSingleProduct} from '../store/singleProduct'

export class singleProduct extends Component {
  componentDidMount() {
    // add props
  }

  render() {
    return <div>Single Product Info</div>
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  singleProduct: singleProductId => dispatch(getSingleProduct(singleProductId))
})

export default connect(mapState, mapDispatch)(singleProduct)
