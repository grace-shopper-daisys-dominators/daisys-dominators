import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewWine} from '../store/allWines'

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
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="wine name"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="imageURL"
            value={this.state.imageURL}
            placeholder="Image URL"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="color"
            value={this.state.color}
            placeholder="Color"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="region"
            value={this.state.region}
            placeholder="Region"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="number"
            name="price"
            value={this.state.number}
            placeholder="Price"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="number"
            name="size"
            value={this.state.size}
            placeholder="size"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="description"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="text"
            name="year"
            value={this.state.year}
            placeholder="year"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <input
            type="number"
            name="rating"
            value={this.state.rating}
            placeholder="rating"
            onChange={e => this.handleChange(e)}
          />
          <br /> <br />
          <button type="submit">Add New Item</button>
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
