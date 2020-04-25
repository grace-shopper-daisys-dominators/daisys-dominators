import React from 'react'
import {Link} from 'react-router-dom'

export const newProductForm = props => {
  return (
    <div>
      <form>
        <h3>Add New Item</h3>
        <input type="text" name="name" placeholder="wine name" />
        <br /> <br />
        <input type="text" name="imageURL" placeholder="Image URL" />
        <br /> <br />
        <input type="text" name="color" placeholder="Color" />
        <br /> <br />
        <input type="text" name="region" placeholder="Region" />
        <br /> <br />
        <input type="text" name="price" placeholder="Price" />
        <br /> <br />
        <input type="text" name="size" placeholder="size" />
        <br /> <br />
        <input type="text" name="description" placeholder="description" />
        <br /> <br />
        <input type="text" name="year" placeholder="year" />
        <br /> <br />
        <button>Add New Item</button>
      </form>
    </div>
  )
}

export default newProductForm
