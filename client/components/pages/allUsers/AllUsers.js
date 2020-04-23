import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllUsers} from '../../../store/allUsers'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    const {users} = this.props
    return (
      <div>
        {users.map(user => {
          return (
            <div key={user.id}>
              <Link to={`users/${user.id}`}>
                <h1>User:</h1>
              </Link>
              <p>
                <b>Firstname:</b> {user.firstName}
              </p>
              <p>
                <b>Lastname:</b> {user.lastName}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.allUsers.all
})

const mapDispatch = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers())
})
export default connect(mapState, mapDispatch)(AllUsers)
