import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchWines} from ''

class AllWines extends React.Component {
  componentDidMount() {
    this.props.getAllWines()
  }
  render() {
    const allWines = this.props.allWines

    return (
      <div>
        <h1>ALL WINES</h1>
        {allWines.map(wine => {
          return (
            <div key={wine.id}>
              <h2> {wine.name} </h2>
              <img src={wine.imageUrl} />
              <h2> {wine.color} </h2>
              <h2> {wine.price} </h2>
              <Link to={`/products/${wine.id}`}>view wine</Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allWines: state.allWines
  }
}

const mapDispatch = dispatch => {
  return {
    getAllWines: () => dispatch(fetchAllWines())
  }
}

export default connect(mapState, mapDispatch)(AllWines)
