import React from 'react'
import {Link} from 'react-router-dom'

const allWines = props => {
  const {wines} = props

  return (
    <div>
      <h1>ALL WINES</h1>
      {wines
        ? wines.map(wine => {
            return (
              <div className="container" key={wine.id}>
                <h2> {wine.name} </h2>
                <img src={wine.imageURL} />
                <h2> {wine.color} </h2>
                <h2> ${wine.price}</h2>
                <Link to={`products/${wine.id}`}>view wine</Link>
              </div>
            )
          })
        : ' '}
    </div>
  )
}

export default allWines
