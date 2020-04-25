import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewWine} from '../store/allWines'

export class NewProductForm extends Component {
  render() {
    const {handleSubmit} = this.props

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="wine name" />
          <br /> <br />
          <input type="text" name="imageURL" placeholder="Image URL" />
          <br /> <br />
          <input type="text" name="color" placeholder="Color" />
          <br /> <br />
          <input type="text" name="region" placeholder="Region" />
          <br /> <br />
          <input type="number" name="price" placeholder="Price" />
          <br /> <br />
          <input type="number" name="size" placeholder="size" />
          <br /> <br />
          <input type="text" name="description" placeholder="description" />
          <br /> <br />
          <input type="text" name="year" placeholder="year" />
          <br /> <br />
          <button type="submit">Add New Item</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const wineName = evt.target.name.value
      const imageURL = evt.target.imageURL.value
      const color = evt.target.color.value
      const region = evt.target.region.value
      const price = evt.target.price.value
      const size = evt.target.size.value
      const description = evt.target.description.value
      const year = evt.target.year.value
      dispatch(
        addNewWine(
          wineName,
          imageURL,
          color,
          region,
          price,
          size,
          description,
          year
        )
      )
    }
  }
}

export default connect(null, mapDispatch)(NewProductForm)
