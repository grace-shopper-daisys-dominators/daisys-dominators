import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateWine} from '../store/singleProduct.js'
import './productForm.css'

export class UpdateProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedName: props.wine.name,
      updatedImageURL: props.wine.imageURL,
      updatedColor: props.wine.color,
      updatedRegion: props.wine.region,
      updatedPrice: props.wine.price,
      updatedSize: props.wine.size,
      updatedDescription: props.wine.description,
      updatedYear: props.wine.year,
      updatedRating: props.wine.rating
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleEdit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e, wineId) {
    e.preventDefault()
    const newWineInfo = {
      name: this.state.updatedName,
      imageURL: this.state.updatedImageURL,
      color: this.state.updatedColor,
      region: this.state.updatedRegion,
      price: this.state.updatedPrice,
      size: this.state.updatedSize,
      description: this.state.updatedDescription,
      year: this.state.updatedYear,
      rating: this.state.updatedRating
    }
    this.props.handleUpdate(wineId, newWineInfo)
  }
  render() {
    const {wine} = this.props
    return (
      <div className="product-form-container">
        <form onSubmit={e => this.handleEdit(e, wine.id)}>
          <h1 id="form-title">UPDATE PRODUCT</h1>
          <div>
            <input
              type="text"
              name="updatedName"
              value={this.state.updatedName}
              placeholder="wine name"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="updatedImageURL"
              value={this.state.updatedImageURL}
              placeholder="Image URL"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="updatedColor"
              value={this.state.updatedColor}
              placeholder="Color"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="updatedRegion"
              value={this.state.updatedRegion}
              placeholder="Region"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="number"
              name="updatedPrice"
              value={this.state.updatedPrice}
              placeholder="Price"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="number"
              name="updatedSize"
              value={this.state.updatedSize}
              placeholder="size"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="updatedYear"
              value={this.state.updatedYear}
              placeholder="year"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="number"
              name="updatedRating"
              value={this.state.updatedRating}
              placeholder="rating"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <textarea
              type="text"
              name="updatedDescription"
              value={this.state.updatedDescription}
              placeholder="description"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <button id="edit-product-btn" type="submit">
              Update product
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    wine: state.singleProduct
  }
}
const mapDispatch = dispatch => {
  return {
    handleUpdate: (wineId, wineToUpdateInfo) =>
      dispatch(updateWine(wineId, wineToUpdateInfo))
  }
}

export default connect(mapState, mapDispatch)(UpdateProductForm)
