import React from 'react'
import {Link} from 'react-router-dom'

const allWines = props => {
  const {wines} = props
  return (
    <div>
      <h1>ALL WINES</h1>
      <Link to="/products/redWines">
        <span className="red" style={{display: 'block'}}>
          RED WINE
        </span>
      </Link>
      <Link to="/products/whiteWines">
        <span className="white" style={{display: 'block'}}>
          WHITE WINE
        </span>
      </Link>{' '}
      <Link to="/products/roseWines">
        <span className="rose" style={{display: 'block'}}>
          ROSÉ
        </span>
      </Link>
      {wines.map(wine => {
        return (
          <div key={wine.id}>
            <h2> {wine.name} </h2>
            <img src={wine.imageURL} />
            <h2> {wine.color} </h2>
            <h2> ${wine.price}</h2>
            <Link to={`/products/${wine.id}`}>view wine</Link>
          </div>
        )
      })}
    </div>
  )
}

export default allWines
