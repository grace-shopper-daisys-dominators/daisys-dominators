import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../../../store/allUsers'
import './singleUser.css'

export class SingleUser extends Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.userId)
  }
  render() {
    const {user} = this.props
    return (
      <div className="user-container">
        <div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>
            <b>Email:</b> {user.email}
          </p>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.allUsers.singleUser
  }
}
const mapDispatch = dispatch => ({
  getSingleUser: userId => dispatch(getSingleUser(userId))
})
export default connect(mapState, mapDispatch)(SingleUser)
