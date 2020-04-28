import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchWinesFromServer} from '../../../store/allWines'
import './style.css'

class WhiteWines extends Component {
  componentDidMount() {
    this.props.getAllWines()
  }
  render() {
    const {wines} = this.props
    const {isAdmin} = this.props.user
    const whiteWines = wines.filter(
      wine => wine.color.toLowerCase() === 'white'
    )

    return (
      <div>
        <div className="wines-outer-container">
          {whiteWines
            ? whiteWines.map(wine => {
                return (
                  <div className="wine-container" key={wine.id}>
                    <Link id="view-more-btn" to={`products/${wine.id}`}>
                      <div id="wine-img-container">
                        <div>
                          <img src={wine.imageURL} />
                        </div>
                      </div>
                    </Link>
                    <div className="wine-details">
                      <div id="wine-name">
                        <h2> {wine.name} </h2>
                      </div>
                      <div>
                        <p> ${wine.price}</p>
                        <Link id="view-more-btn" to={`products/${wine.id}`}>
                          View more
                        </Link>
                      </div>
                      <div id="delete-btn">
                        {isAdmin ? (
                          <button
                            type="button"
                            onClick={() => this.props.handleDelete(wine.id)}
                          >
                            Delete Product
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            : 'No white wines avaliable.'}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    wines: state.allWines.all,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getAllWines: () => dispatch(fetchWinesFromServer())
  }
}

export default connect(mapState, mapDispatch)(WhiteWines)
