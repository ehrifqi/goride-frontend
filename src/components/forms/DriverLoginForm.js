import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signInDriver } from '../../store/actions/auth'
import { connect } from 'react-redux';

import './DriverLoginForm.css';
class DriverLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onLogin = (event) => {
    event.preventDefault();
    this.props.signInDriver({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <form>
        <div className="form__container">
          <h1 className="title--center">Driver Login</h1>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Email</label>
            <input type="text" name="email" placeholder="Email" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Password</label>
            <input type="password" name="password" placeholder="Password" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="row justify-content-md-center">
            <button className="positive ui button" onClick={this.onLogin}>Login</button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(null, {signInDriver})(DriverLoginForm);