import React from 'react'
import {connect} from 'react-redux'
import {fetchWinesFromServer} from '../../../store/allWines'
import AllWines from '../../allWines'
import AddNewProduct from '../../NewProductForm'
import './style.css'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllWines()
  }
  render() {
    const {isAdmin} = this.props.user

    return (
      <div>
        {isAdmin ? (
          <div>
            <AddNewProduct />
          </div>
        ) : (
          ''
        )}
        <div className="halo" />
        <div>
          <span className="intro intro--the">The</span>
          <span className="intro intro--num">first #1</span>
          <span className="intro">vintage typeface</span>
        </div>
        <div className="vintage__container">
          <p className="vintage vintage__top">Daisy's Wine Shop</p>
          <p className="vintage vintage__bot">Daisy's Wine Shop</p>
        </div>
        <div>
          <span className="outro">NO.01</span>
          <span className="outro outro--big">TYPEFACE RECREATED</span>
          <span className="outro">CSS</span>
          <span className="outro outro--smart">smart cookie</span>
        </div>
        <div>
          <div>
            <AllWines wines={this.props.wines} />
          </div>
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

export default connect(mapState, mapDispatch)(HomePage)
