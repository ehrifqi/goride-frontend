import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeCurrentUser } from '../store/actions/auth'

class Logout extends Component {
  render() {
    return (
      <div></div>
    )
  }

  componentDidMount = () => {
    // Clear all
    this.props.removeCurrentUser()
    this.props.history.push('/')
  }
}

export default withRouter(connect(null, {
  removeCurrentUser
})(Logout))