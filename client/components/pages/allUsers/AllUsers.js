import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../../../store/allUsers'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    const {users} = this.props
    return <div>get all users</div>
  }
}

const mapState = state => {
  return {
    users: state.allUsers
  }
}

const mapDispatch = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers())
})
export default connect(mapState, mapDispatch)(AllUsers)
