import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllUsers} from '../../../store/allUsers'
import './allUsers.css'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    const {users} = this.props
    return (
      <div className="users-container">
        <h1>Users</h1>
        {users
          ? users.map(user => {
              return (
                <div key={user.id}>
                  <Link id="user-link" to={`users/${user.id}`}>
                    <div className="single-user-container">
                      <div>
                        <p>
                          <b>Fullname:</b> {user.firstName} {user.lastName}
                        </p>
                        <p>
                          <b>Email:</b> {user.email}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          : 'No users yet!'}
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
