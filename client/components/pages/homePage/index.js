import React from 'react'
import {connect} from 'react-redux'
import {fetchWinesFromServer} from '../../../store/allWines'
import AllWines from '../../allWines'
import './style.css'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllWines()
  }
  render() {
    return (
      <div>
        <AllWines wines={this.props.wines} />
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

export default connect(mapState, mapDispatch)(HomePage)
