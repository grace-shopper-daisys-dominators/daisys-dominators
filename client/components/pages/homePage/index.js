import React from 'react'
import {connect} from 'react-redux'
import {fetchWinesFromServer, deleteWine} from '../../../store/allWines'
import {Link} from 'react-router-dom'
// import AllWines from '../../allWines'
import './style.css'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllWines()
  }
  render() {
    const {wines} = this.props
    return (
      <div>
        {/** transfer code from allWines file component here to be able to add delete button and use the class component to access handle delete */}
        <h1>ALL WINES</h1>
        {wines
          ? wines.map(wine => {
              console.log('component wine', wine.id)
              return (
                <div className="container" key={wine.id}>
                  <h2> {wine.name} </h2>
                  <img src={wine.imageURL} />
                  <h2> {wine.color} </h2>
                  <h2> ${wine.price}</h2>
                  <Link to={`products/${wine.id}`}>view wine</Link>
                  <button
                    type="button"
                    onClick={() => this.props.handleDelete(wine.id)}
                  >
                    Delete product
                  </button>
                </div>
              )
            })
          : ' '}
      </div>
    )
  }
}

const mapState = state => {
  return {
    wines: state.allWines.all
  }
}

const mapDispatch = dispatch => {
  return {
    getAllWines: () => dispatch(fetchWinesFromServer()),
    handleDelete: wineId => dispatch(deleteWine(wineId))
  }
}

export default connect(mapState, mapDispatch)(HomePage)
