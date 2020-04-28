import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewWine} from '../store/allWines'
import './productForm.css'

export class NewProductForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageURL: '',
      color: '',
      region: '',
      price: '',
      size: '',
      description: '',
      year: '',
      rating: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const newWine = {
      name: this.state.name,
      imageURL: this.state.imageURL,
      color: this.state.color,
      region: this.state.region,
      price: this.state.price,
      size: this.state.size,
      description: this.state.description,
      year: this.state.year,
      rating: this.state.rating
    }
    this.props.addNewWine(newWine)
    this.setState({
      name: '',
      imageURL: '',
      color: '',
      region: '',
      price: '',
      size: '',
      description: '',
      year: '',
      rating: ''
    })
  }
  render() {
    return (
      <div className="product-form-container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Wine name"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="imageURL"
              value={this.state.imageURL}
              placeholder="Image URL"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="color"
              value={this.state.color}
              placeholder="Color"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="region"
              value={this.state.region}
              placeholder="Region"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              value={this.state.number}
              placeholder="Price"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="number"
              name="size"
              value={this.state.size}
              placeholder="Size"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="year"
              value={this.state.year}
              placeholder="Year"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              type="number"
              name="rating"
              value={this.state.rating}
              placeholder="Rating"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              placeholder="Description"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <button id="add-product-btn" type="submit">
              Add product
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allWines: state.allWines.all
  }
}
const mapDispatch = dispatch => {
  return {
    addNewWine: newWineInfo => dispatch(addNewWine(newWineInfo))
  }
}

export default connect(mapState, mapDispatch)(NewProductForm)
