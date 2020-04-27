import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateWine} from '../store/allWines'
import {getSingleProduct} from '../store/singleProduct'

export class UpdateProductForm extends Component {
  constructor() {
    super()
    this.state = {
      updatedName: '',
      updatedImageURL: '',
      updatedColor: '',
      updatedRegion: '',
      updatedPrice: '',
      updatedSize: '',
      updatedDescription: '',
      updatedYear: '',
      updatedRating: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.getProduct()
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.imageURL]: e.target.value,
      [e.target.color]: e.target.value,
      [e.target.region]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.size]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.year]: e.target.value,
      [e.target.rating]: e.target.rating
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
      <div>
        <form onSubmit={e => this.handleEdit(e, wine.id)}>
          <input
            type="text"
            name="updatedName"
            value={this.state.updatedName}
            placeholder="wine name"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="updatedImageURL"
            value={this.state.updatedImageURL}
            placeholder="Image URL"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="updatedColor"
            value={this.state.updatedColor}
            placeholder="Color"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="updatedRegion"
            value={this.state.updatedRegion}
            placeholder="Region"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="number"
            name="updatedPrice"
            value={this.state.updatedPrice}
            placeholder="Price"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="number"
            name="updatedSize"
            value={this.state.updatedSize}
            placeholder="size"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="updatedDescription"
            value={this.state.updatedDescription}
            placeholder="description"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="updatedYear"
            value={this.state.updatedYear}
            placeholder="year"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="number"
            name="updatedRating"
            value={this.state.updatedRating}
            placeholder="rating"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <button type="submit">Edit Info</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    wine: state.allWines
  }
}
const mapDispatch = dispatch => {
  return {
    handleUpdate: wineToUpdateInfo => dispatch(updateWine(wineToUpdateInfo)),
    getProduct: () => dispatch(getSingleProduct())
  }
}

export default connect(mapState, mapDispatch)(UpdateProductForm)
