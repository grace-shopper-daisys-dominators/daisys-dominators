import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchWinesFromServer} from '../../store/allWines'

class RedWines extends Component {
  componentDidMount() {
    this.props.getAllWines()
  }
  render() {
    const {wines} = this.props
    const redWines = wines.filter(wine => wine.color.toLowerCase() === 'red')

    return (
      <div>
        {redWines
          ? redWines.map(wine => {
              return (
                <div key={wine.id}>
                  <h2>{wine.name}</h2>
                  <img src={wine.imageURL} />
                  <h2>{wine.color}</h2>
                  <h2>${wine.price}</h2>
                  <Link to={`/products/${wine.id}`}>view wine</Link>
                </div>
              )
            })
          : 'No red wines avaliable'}
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
    getAllWines: () => dispatch(fetchWinesFromServer())
  }
}

export default connect(mapState, mapDispatch)(RedWines)
